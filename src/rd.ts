/**
 * A simulation of two virtual chemicals reacting and diffusing on a 2D grid using the Gray-Scott model
 * https://www.karlsims.com/rd.html
 * https://www.youtube.com/watch?v=BV9ny785UNc
 */

interface Cell {
  a: number;
  b: number;
}

type Grid = Cell[][]

function laplacianA(cell: Cell, grid: Grid, row: number, col: number) {
  let sum = 0
  sum += (grid[row]?.[col]?.a * -1) || 0
  sum += (grid[row - 1]?.[col]?.a * .2) || 0
  sum += (grid[row + 1]?.[col]?.a * .2) || 0
  sum += (grid[row]?.[col + 1]?.a * .2) || 0
  sum += (grid[row]?.[col - 1]?.a * .2) || 0
  sum += (grid[row - 1]?.[col - 1]?.a * .05) || 0
  sum += (grid[row + 1]?.[col + 1]?.a * .05) || 0
  sum += (grid[row + 1]?.[col - 1]?.a * .05) || 0
  sum += (grid[row - 1]?.[col + 1]?.a * .05) || 0
  return sum
}

function laplacianB(cell: Cell, grid: Grid, row: number, col: number) {
  let sum = 0
  sum += (grid[row]?.[col]?.b * -1) || 0
  sum += (grid[row - 1]?.[col]?.b * .2) || 0
  sum += (grid[row + 1]?.[col]?.b * .2) || 0
  sum += (grid[row]?.[col + 1]?.b * .2) || 0
  sum += (grid[row]?.[col - 1]?.b * .2) || 0
  sum += (grid[row - 1]?.[col - 1]?.b * .05) || 0
  sum += (grid[row + 1]?.[col + 1]?.b * .05) || 0
  sum += (grid[row + 1]?.[col - 1]?.b * .05) || 0
  sum += (grid[row - 1]?.[col + 1]?.b * .05) || 0
  return sum
}

interface Options {
  // diffusion rate of chemical a
  dA: number;
  // diffusion rate of chemical b
  dB: number;
  // rate at which chemical a is added (feed)
  f: number
  // rate at which chemical b is removed (kill)
  k: number;
}

function update(grid: Grid, opts: Options) {
  return grid.map((row, r) => row.map((cell, c) => {
    const a = cell.a + 
              (opts.dA * laplacianA(cell, grid, r, c)) - 
              (cell.a * (cell.b ** 2)) + 
              (opts.f * (1 - cell.a))

    const b = cell.b + 
              (opts.dB * laplacianB(cell, grid, r, c)) + 
              (cell.a * (cell.b ** 2)) - 
              ((opts.k + opts.f) * cell.b)

    return { a, b }
  }))
}

// function draw(ctx: CanvasRenderingContext2D, grid: Grid) {
//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[row].length, col++) {
//       const cell = (grid[row] || [])[col]
//       ctx.fillStyle = cell === 1 ? 'black' : 'white'
//       ctx.fillRect(row * size, col * size, size, size)
//     }
//   }
// }

export {
  update,
}