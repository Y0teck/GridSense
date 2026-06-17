// SCRIPT ONE-SHOT - Ne pas relancer apres generation de refMix.json
// Verifier les noms de champs logges en console avant de valider le mapping.
// Source : ODRE (RTE) - https://opendata.reseaux-energies.fr

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const API_URL =
  'https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/prod-national-annuel-filiere/records?limit=1&order_by=annee%20desc'

const SOURCE_URL =
  'https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const outputPath = path.resolve(__dirname, '../src/data/refMix.json')

function normalizeKey(key) {
  return key
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function toNumber(value) {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'))
    return Number.isFinite(parsed) ? parsed : 0
  }

  return 0
}

function pickNumber(record, candidates) {
  const entries = Object.entries(record)
  const normalizedCandidates = candidates.map(normalizeKey)

  const exactMatch = entries.find(([key]) =>
    normalizedCandidates.includes(normalizeKey(key)),
  )

  if (exactMatch) {
    return toNumber(exactMatch[1])
  }

  const partialMatch = entries.find(([key]) => {
    const normalizedKey = normalizeKey(key)
    return normalizedCandidates.some((candidate) =>
      normalizedKey.includes(candidate),
    )
  })

  return partialMatch ? toNumber(partialMatch[1]) : 0
}

async function main() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Erreur API ODRE : ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  const record = payload.results?.[0]

  if (!record) {
    throw new Error('Aucun record ODRE retourne par l API.')
  }

  console.log('Champs retournes par ODRE :')
  Object.entries(record).forEach(([field, value]) => {
    console.log(`${field}: ${value}`)
  })

  const mapped = {
    annee: pickNumber(record, ['annee', 'annee_de_production']),
    nucleaire: pickNumber(record, ['nucleaire', 'nucleaire_twh']),
    eolien: pickNumber(record, ['eolien', 'eolien_twh']),
    solaire: pickNumber(record, ['solaire', 'solaire_twh']),
    hydraulique: pickNumber(record, ['hydraulique', 'hydraulique_twh']),
    gaz: pickNumber(record, ['gaz', 'gaz_twh', 'thermique_gaz']),
    charbon: pickNumber(record, ['charbon', 'charbon_twh', 'thermique_charbon']),
    total: pickNumber(record, ['total', 'production_totale', 'total_twh']),
    source: 'ODRE / RTE - Bilan electrique annuel',
    url: SOURCE_URL,
  }

  fs.writeFileSync(outputPath, `${JSON.stringify(mapped, null, 2)}\n`, 'utf8')

  console.log(
    `Donnees ODRE sauvegardees - Annee : ${mapped.annee} - Total : ${mapped.total} TWh`,
  )
  console.log(
    'Verifier les noms de champs dans la console avant de valider le mapping.',
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
