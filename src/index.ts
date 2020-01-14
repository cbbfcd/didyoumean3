export interface GetVal {
  (x: any): string
}

export type Options = {
  ignore?: boolean,
  trim?: boolean,
  normalize?: boolean,
  key?: string | GetVal
}

export type Matched = {
  score: number,
  target: string | object
}

export type Return = {
  matches: ReadonlyArray<Matched>,
  first: string | object | null
}

const defaultOptions: Partial<Options> = {
  ignore: false,
  trim: true,
  normalize: false
}

const normalize = (input: string, opt: Options): string => {
  let s: string = input

  if (opt.ignore) s = s.toLowerCase()
  if (opt.trim) s = s.trim().replace(/\s+/g, ' ')

  // handle diacritics, such as 'café'
  if (opt.normalize) s = s.normalize()

  return s
}

// dice-coefficient
export const dice = (left: string, right: string, opts: Partial<Options> = {}): number => {
  right = normalize(right, opts)
  let l = [...left]
  let r = [...right]
  let lenl = l.length
  let lenr = r.length

  if (!lenr) return 0
  if (left === right) return 1
  if (lenl < 2) l.unshift('*')
  if (lenr < 2) r.unshift('*')

  let intersections = 0
  let idxl = -1
  let map = new Map()
  while(++idxl < lenl - 1) {
    const bigram = l.slice(idxl, idxl + 2).join('')
    const count = map.has(bigram)
      ? map.get(bigram) + 1
      : 1
    map.set(bigram, count)
  }

  let idxr = -1
  while(++idxr < lenr - 1) {
    const bigram = r.slice(idxr, idxr + 2).join('')
    const count = map.has(bigram)
      ? map.get(bigram)
      : 0
    if (count > 0) {
      intersections++
      map.set(bigram, count - 1)
    }
  }

  return (2.0 * intersections) / (lenl + lenr) 
}

const val = <T extends string | object>(v: T, k?: string | GetVal): string => {
  return typeof v === 'string'
    ? v
    : typeof k === 'function'
      ? k(v as T)
      : (v as any)[k || '']
}

export const didyoumean3 = <T extends string | object>(input: string, list: ReadonlyArray<T>, opts: Options = {}): Return | null => {
  const {key, ...rest} = {...defaultOptions, ...opts}

  input = normalize(input, rest)
  if (!input) return null

  const len = list.length
  let matches = []
  let idx = -1
  let max = 0
  let closest = -1
  let first = null

  while(++idx < len) {
    const target = list[idx]
    const score = dice(input, val(target, key), rest)
    matches.push({ score, target })
    if (score > max) {
      closest = idx
      max = score
    }
  }

  !!~closest && (first = list[closest])

  return { matches, first }
}

export default didyoumean3

