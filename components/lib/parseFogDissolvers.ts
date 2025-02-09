import { DataCell, FogDissolver, TriggerEffect } from "../types/Data"

function parseFogDissolvers(
  triggereffects: TriggerEffect[],
): FogDissolver[] {
  let fogDissolvers: FogDissolver[] = []
  if (triggereffects === undefined){
    // Default foglights, die benachbarte Felder erhellen
    for (let rowCounter = 0; rowCounter <= 8; rowCounter++){
      for (let columnCounter = 0; columnCounter <= 8; columnCounter++){
        let fogDissolver : FogDissolver = { origin: [rowCounter, columnCounter], cells: [] }
        for (let neighborRowsCounter = rowCounter-1; neighborRowsCounter <= rowCounter+1; neighborRowsCounter++){
          for (let neighborColumnCounter = columnCounter-1; neighborColumnCounter <= columnCounter+1; neighborColumnCounter++){
            if (0 <= neighborRowsCounter && neighborRowsCounter <= 8 && 0 <= neighborColumnCounter && neighborColumnCounter <= 8){
              fogDissolver.cells.push([neighborRowsCounter, neighborColumnCounter])
            }
          }
        }
        fogDissolvers.push(fogDissolver)
      }
    }
  }
  else {
    triggereffects.forEach(triggerEffect => {
      const parseSingleCell = (cell: string) => {
        let row : number = parseInt(cell.charAt(1))
        let column : number = parseInt(cell.charAt(3))
        return [row-1, column-1]
      }

      const addCells = (fogDissolver: FogDissolver, cells: string) => {
        let rowValue : number = -1

        for (let charCounter = 1; charCounter < cells.length; charCounter+=2) {
          const value: number = parseInt(cells[charCounter])
          if (rowValue > 0)
          {
            fogDissolver.cells.push([rowValue-1, value-1])
            rowValue = -1
          }
          else {
            rowValue = value
          }
        }
      }

      if (triggerEffect.trigger.type === "cellvalue" && triggerEffect.effect.type === "foglight"){
        let fogDissolver : FogDissolver = { origin: [0, 0], cells: [] }
        let origin : number[] = parseSingleCell(triggerEffect.trigger.cell)
        fogDissolver.origin = [origin[0], origin[1]]
        addCells(fogDissolver, triggerEffect.effect.cells)
        fogDissolvers.push(fogDissolver)
      }
      else {
        console.log("Warning: Unknown Type when trying to parse fogdissolvers")
      }
    })
  }
  return fogDissolvers
}

export default parseFogDissolvers
