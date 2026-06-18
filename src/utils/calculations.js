// Source donnees : coefficients transmis par src/data/energyData.js.

import { ENERGY_SOURCES } from '../data/energyData'

export function calcCO2(mix, sources) {
  const total = Object.keys(sources).reduce((sum, id) => {
    return sum + (mix[id] / 100) * sources[id].co2
  }, 0)

  return Math.round(total * 10) / 10
}

export function calcCost(mix, sources) {
  const total = Object.keys(sources).reduce((sum, id) => {
    return sum + (mix[id] / 100) * sources[id].cost
  }, 0)

  return Math.round(total * 10) / 10
}

export function calcStability(mix, sources) {
  return Object.keys(sources).reduce((sum, id) => {
    return sources[id].pilotable ? sum + mix[id] : sum
  }, 0)
}

export function calcRenewables(mix) {
  return mix.eolien + mix.solaire + mix.hydraulique + mix.bioenergies
}

export function calculateResults(mix) {
  const renewables = calcRenewables(mix)

  return {
    co2: calcCO2(mix, ENERGY_SOURCES),
    cost: calcCost(mix, ENERGY_SOURCES),
    stability: calcStability(mix, ENERGY_SOURCES),
    renewables,
    lowCarbon: mix.nucleaire + renewables,
  }
}
