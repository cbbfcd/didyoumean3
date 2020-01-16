# didyoumean3

[![Greenkeeper badge](https://badges.greenkeeper.io/cbbfcd/didyoumean3.svg)](https://greenkeeper.io/)

> notice: Covers most situations and still needs to be optimized, i will do better!

## features

- Shortest editing algorithm with built-in levenshtein and dice-coefficient
- Support custom extended edit distance algorithm
- Support custom your return result
- Typescript
- Super fast 🚀
- [ ] Support emoji or diacritics

## usage

```js
npm i didyoumean3
```

```js
const didyoumean3 = require('didyoumean3').default
// or if you are using TypeScript or ES module
import didyoumean3 from 'didyoumean3'

let input = 'insargrm'
let list = [
  'facebook', 'INSTAgram', ' in stagram', 'baidu', 'twitter', 'wechat', 'instagram', 'linkedin'
]

// levenshtein
didyoumean3(input, list) // instagram

// dice-coefficient
didyoumean3(input, list, { similar: 'dice' }) // instagram
```
read more config info 👇

## options description

I'm lazy, I just give the declaration file 👇

```ts
export interface Val {
  (x: string | object): string
}

export interface Similar {
  (a: string, b: string, opts?: Partial<Options>): number
}

export interface Return {
  (x: any): any
}

export interface Normalize {
  (x: string): string
}

// dice-coefficient or levenshtein
export type BuiltInSimilar = 'dice' | 'leven'

/**
 * @type {boolean} ignore: ignore case 'A' -> 'a'
 * @type {boolean} trim: ' a bcs ' -> 'a bcs'
 * @type {boolean} trimAll: ' a bcs' -> 'abcs'
 * @type {boolean} diacritics: 'café' -> 'café'.normalize()
 * @type {Function} val: when you need find the best result in a object list, it's useful
 * @type {string | Function} similar: use builtin shortest edit-distance algorithm or yours
 * @type {Function} result: you can custom your return result
 * @type {Function} compartor: you can custom the compare rules, because will maybe use the highest score or the lowest score
 */
export type Options = {
  ignore?: boolean, // default false
  trim?: boolean, // default true
  trimAll?: boolean, // default false
  diacritics?: boolean, // default false
  normalize?: Normalize, // default undefined
  val?: Val, // default undefined
  similar?: BuiltInSimilar | Similar, // default leven
  result?: Return, // default undefined
  compartor?: Compartor // default undefined
}
```

## benchmark

```js
didyoumean x 193,411 ops/sec ±1.39% (87 runs sampled)
didyoumean2 x 303,996 ops/sec ±1.72% (82 runs sampled)
didyoumean3-leven x 489,616 ops/sec ±0.76% (89 runs sampled)
didyoumean3-dice x 130,456 ops/sec ±0.57% (91 runs sampled)
Fastest is didyoumean3-leven
```

## changelog

#### v-1.0.0

1. refactor the beta version, and we can custom our algorithm
2. we can custom our result now
3. we can custom our normalize string function now
4. builtin dice-coefficient or levenshtein algorithm

## contributors

nobody now.

> Both issure and pr are welcome!

## license

[MIT](./LICENSE)
