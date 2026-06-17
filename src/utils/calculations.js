// Source donnees : coefficients transmis par src/data/energyData.js.

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
