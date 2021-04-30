import { getRandomIntInclusive } from './utils'

type CellState = 0 | 1

type State = CellState[][]

type Neighbors = {
  nw: CellState,
  n: CellState,
  ne: CellState,
  w: CellState,
  e: CellState,
  sw: CellState,
  s: CellState,
  se: CellState,
}

function getNeighbors(row: number, col: number, grid: State) {
  return {
    nw: grid[row - 1]?.[col - 1],
    n: grid[row - 1]?.[col],
    ne: grid[row - 1]?.[col + 1],
    w: grid[row]?.[col - 1],
    e: grid[row]?.[col + 1],
    sw: grid[row + 1]?.[col - 1],
    s: grid[row + 1]?.[col],
    se: grid[row + 1]?.[col + 1],
  }
}

function sumNeighbors(neighbors: Neighbors) {
  return Object.values(neighbors).filter(Boolean).reduce((acc: number, cur: CellState) => acc + cur, 0)
}

function init(rows: number, cols: number, initFn: (row?: number, col?: number) => CellState) {
  return Array.from({ length: rows }, (_, row) => Array.from({ length: cols }, (_, col) => initFn(row, col)))
}

function defaultInitFn() {
  return getRandomIntInclusive(0, 1) as CellState
}

function getNextCellState(cell: CellState, neighbors: number) {
  switch([cell, neighbors].join(',')) {
    case '1,2':
      return 1
    case '1,3':
      return 1
    case '0,3':
      return 1
    default:
      return 0
  }
}

function getNextGeneration(state: State) {
  return state.map((rows, row) => rows.map((cell, col) => {
    const neighborhood = getNeighbors(row, col, state)
    const neighbors = sumNeighbors(neighborhood)
    const next = getNextCellState(cell, neighbors)
    return next
  }))
}

export {
  State,
  CellState,
  init,
  defaultInitFn,
  getNextGeneration,
}