// Primary source: IEA World Energy Outlook 2025 Free Dataset
// https://www.iea.org/data-and-statistics/data-product/world-energy-outlook-2025-free-dataset

import refMix from './refMix.json'

const MIX_KEYS = [
  'nucleaire',
  'eolien',
  'solaire',
  'hydraulique',
  'gaz',
  'charbon',
  'bioenergies',
]

function normalizeRoundedMix(values) {
  const rounded = MIX_KEYS.reduce((mix, key) => {
    mix[key] = Math.round(values[key])
    return mix
  }, {})

  const total = MIX_KEYS.reduce((sum, key) => sum + rounded[key], 0)
  const largestKey = MIX_KEYS.reduce((largest, key) => {
    return rounded[key] > rounded[largest] ? key : largest
  }, MIX_KEYS[0])

  return {
    ...rounded,
    [largestKey]: rounded[largestKey] + (100 - total),
  }
}

const FRANCE_MIX = normalizeRoundedMix({
  nucleaire: (refMix.nucleaire / refMix.total) * 100,
  eolien: (refMix.eolien / refMix.total) * 100,
  solaire: (refMix.solaire / refMix.total) * 100,
  hydraulique: (refMix.hydraulique / refMix.total) * 100,
  gaz: (refMix.gaz / refMix.total) * 100,
  charbon: ((refMix.charbon + refMix.fioul) / refMix.total) * 100,
  bioenergies: (refMix.bioenergies / refMix.total) * 100,
})

export const COUNTRY_PRESETS = [
  {
    id: 'france',
    label: 'France',
    flag: '🇫🇷',
    year: refMix.annee,
    source: 'ODRE / RTE - Bilan electrique annuel 2025, src/data/refMix.json',
    mix: FRANCE_MIX,
  },
  {
    id: 'germany',
    label: 'Allemagne',
    flag: '🇩🇪',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 1,
      eolien: 26,
      solaire: 11,
      hydraulique: 4,
      gaz: 15,
      charbon: 34,
      bioenergies: 9,
    },
  },
  {
    id: 'poland',
    label: 'Pologne',
    flag: '🇵🇱',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 0,
      eolien: 14,
      solaire: 7,
      hydraulique: 1,
      gaz: 8,
      charbon: 65,
      bioenergies: 5,
    },
  },
  {
    id: 'spain',
    label: 'Espagne',
    flag: '🇪🇸',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 20,
      eolien: 25,
      solaire: 20,
      hydraulique: 10,
      gaz: 17,
      charbon: 5,
      bioenergies: 3,
    },
  },
  {
    id: 'sweden',
    label: 'Suède',
    flag: '🇸🇪',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 29,
      eolien: 21,
      solaire: 2,
      hydraulique: 39,
      gaz: 0,
      charbon: 1,
      bioenergies: 8,
    },
  },
  {
    id: 'norway',
    label: 'Norvège',
    flag: '🇳🇴',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 0,
      eolien: 10,
      solaire: 0,
      hydraulique: 88,
      gaz: 1,
      charbon: 0,
      bioenergies: 1,
    },
  },
  {
    id: 'usa',
    label: 'États-Unis',
    flag: '🇺🇸',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 19,
      eolien: 10,
      solaire: 6,
      hydraulique: 6,
      gaz: 42,
      charbon: 16,
      bioenergies: 1,
    },
  },
  {
    id: 'china',
    label: 'Chine',
    flag: '🇨🇳',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 5,
      eolien: 9,
      solaire: 6,
      hydraulique: 13,
      gaz: 3,
      charbon: 62,
      bioenergies: 2,
    },
  },
  {
    id: 'india',
    label: 'Inde',
    flag: '🇮🇳',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 3,
      eolien: 4,
      solaire: 6,
      hydraulique: 9,
      gaz: 2,
      charbon: 73,
      bioenergies: 3,
    },
  },
  {
    id: 'brazil',
    label: 'Brésil',
    flag: '🇧🇷',
    year: 2023,
    source: 'IEA WEO 2025 Free Dataset, historical 2023',
    mix: {
      nucleaire: 3,
      eolien: 14,
      solaire: 7,
      hydraulique: 58,
      gaz: 5,
      charbon: 5,
      bioenergies: 8,
    },
  },
]
