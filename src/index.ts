import './index.css'
import {
  init,
} from './utils'
import {
  update,
} from './rd'

const WIDTH = 600
const HEIGHT = 600
const rows = 200
const size = WIDTH / rows

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

canvas.width = WIDTH
canvas.height = HEIGHT

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

// setup 
const initialState = init(rows, rows, (r: number, c: number) => {
  return (r > 90) && (r < 110) && (c > 90) && (c < 110)
    ? { a: 0, b: 1}
    : { a: 1, b: 0 }
})

/*
f=.0367, k=.0649) and a "coral growth" simulation (f=.0545, k=.062
*/
const defaultOpts = {
  dA: 1.0,
  dB: 0.5,
  f: 0.055,
  k: 0.062,
}

function getFillStyle(cell: { a: number, b: number }) {
  const color = Math.floor((cell.a - cell.b) * 255)
  const r = cell.a * 255
  const g = 0 
  const b = cell.b * 255
  const a = 255
  return `rgba(${[color, color, color, a].join(', ')})`
}

function draw(ctx: CanvasRenderingContext2D, grid: { a: number, b: number }[][]) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col]
      ctx.fillStyle = getFillStyle(cell)
      ctx.fillRect(row * size, col * size, size, size)
    }
  }
}

function loop(state = initialState, opts = defaultOpts) {
  draw(ctx, state)
  const nextState = update(state, opts)
  setTimeout(() => {
    loop(nextState)
  })
}

loop()
