import {DataCell, FogDissolver, FogLight, TriggerEffect} from "../types/Data"
import {forEach, isString} from "lodash"

function parseFogLights(
  foglightsInput: [number, number][],
): FogLight[] {
  let foglights: FogLight[] = []
  foglightsInput.forEach(foglight => {
    let newFogLight: FogLight = {center: foglight, size: 1}
    foglights.push(newFogLight)
  })
  return foglights
}

export default parseFogLights
