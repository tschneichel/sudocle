import { FogLight } from "../types/Data"
import { Digit } from "../types/Game"
import { ThemeColours } from "./ThemeColours"

export interface GridElement {
  clear(): void

  draw(options: {
    cellSize: number
    zoomFactor: number
    unitSize: number
    currentDigits: Map<number, Digit>
    currentFogLights: FogLight[] | undefined
    currentFogRaster: number[][] | undefined
    themeColours: ThemeColours
    gridOffset: { x: number; y: number }
  }): void
}
