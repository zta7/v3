// 拓展 quasar.format
import { format } from 'quasar'

format.humanMemorySize = (v, from, to = 'gb') => {
  const types = [
    ['bit', 8], ['byte', 1024], ['kb', 1024], ['mb', 1024], ['gb', 1024], ['tb', 1024]
  ]
  const i = types.findIndex(e => new RegExp(`^${e[0]}$`, 'i').test(from))
  const i2 = types.findIndex(e => new RegExp(`^${e[0]}$`, 'i').test(to))
  if (i === -1 || i2 === -1) return v

  const multiple = (small, bigger) => {
    let r = 1
    while (bigger > small) {
      r *= types[bigger][1]
      bigger -= 1
    }
    return r
  }

  if (i === i2) return `${v} ${to}`
  else if (i > i2) return `${(v * multiple(i2, i)).toFixed(2)} ${to}`
  else return `${(v / multiple(i, i2)).toFixed(2)} ${to}`
}

