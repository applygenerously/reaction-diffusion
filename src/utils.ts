function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

type Grid<T> = T[][]

function init<T>(rows: number, cols: number, seed: (row: number, col: number) => T): Grid<T> {
  return Array.from({ length: rows }, (_, row) => {
    return Array.from({ length: cols }, (_, col) => seed(row, col))
  })
}

export {
  getRandomIntInclusive,
  init,
}
