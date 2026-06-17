// Source donnees de reference : ODRE / RTE - Bilan electrique annuel
// https://odre.opendatasoft.com/explore/dataset/prod-national-annuel-filiere/
// Valeurs en % calculees depuis TWh - Annee : voir refMix.json

import refMix from './refMix.json'

export const ENERGY_SOURCES = {
  nucleaire: {
    id: 'nucleaire',
    label: 'Nucléaire',
    color: '#3B82F6',
    co2: 12,
    cost: 70,
    pilotable: true,
    icon: '⚛️',
  },
  eolien: {
    id: 'eolien',
    label: 'Éolien',
    color: '#6EE7B7',
    co2: 11,
    cost: 50,
    pilotable: false,
    icon: '💨',
  },
  solaire: {
    id: 'solaire',
    label: 'Solaire',
    color: '#EAB308',
    co2: 45,
    cost: 45,
    pilotable: false,
    icon: '☀️',
  },
  hydraulique: {
    id: 'hydraulique',
    label: 'Hydraulique',
    color: '#60A5FA',
    co2: 24,
    cost: 40,
    pilotable: true,
    icon: '💧',
  },
  gaz: {
    id: 'gaz',
    label: 'Gaz',
    color: '#F97316',
    co2: 490,
    cost: 100,
    pilotable: true,
    icon: '🔥',
  },
  charbon: {
    id: 'charbon',
    label: 'Thermique fossile',
    color: '#6B7280',
    co2: 820,
    cost: 80,
    pilotable: true,
    icon: '🏭',
  },
  bioenergies: {
    id: 'bioenergies',
    label: 'Bioénergies',
    color: '#84CC16',
    co2: 230,
    cost: 90,
    pilotable: true,
    icon: '🌿',
  },
}

function normalizeRoundedMix(mix) {
  const roundedTotal = Object.values(mix).reduce((sum, value) => sum + value, 0)
  const difference = 100 - roundedTotal

  return {
    ...mix,
    nucleaire: mix.nucleaire + difference,
  }
}

export const REF_MIX = refMix.annee
  ? normalizeRoundedMix({
      nucleaire: Math.round((refMix.nucleaire / refMix.total) * 100),
      eolien: Math.round((refMix.eolien / refMix.total) * 100),
      solaire: Math.round((refMix.solaire / refMix.total) * 100),
      hydraulique: Math.round((refMix.hydraulique / refMix.total) * 100),
      gaz: Math.round((refMix.gaz / refMix.total) * 100),
      charbon: Math.round(((refMix.charbon + refMix.fioul) / refMix.total) * 100),
      bioenergies: Math.round((refMix.bioenergies / refMix.total) * 100),
    })
  : {
      nucleaire: 68,
      eolien: 10,
      solaire: 5,
      hydraulique: 12,
      gaz: 4,
      charbon: 1,
      bioenergies: 0,
    }

export { refMix }
