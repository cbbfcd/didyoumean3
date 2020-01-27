# didyoumean3

[![NPM](https://nodei.co/npm/didyoumean3.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/didyoumean3/)


[![Greenkeeper badge](https://badges.greenkeeper.io/cbbfcd/didyoumean3.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.com/cbbfcd/didyoumean3.svg?branch=master)](https://travis-ci.com/cbbfcd/didyoumean3)
![Codecov](https://img.shields.io/codecov/c/github/cbbfcd/didyoumean3)
![David](https://img.shields.io/david/dev/cbbfcd/didyoumean3)
![npm](https://img.shields.io/npm/dw/didyoumean3)
![npm](https://img.shields.io/npm/v/didyoumean3)
![GitHub top language](https://img.shields.io/github/languages/top/cbbfcd/didyoumean3)
![NPM](https://img.shields.io/npm/l/didyoumean3)

> notice: Covers most situations and still needs to be optimized, i will do better!

## features

- Built-in fastest shortest edit distance algorithm -> levenshtein and dice-coefficient
- Support custom algorithms
- Support custom return results
- Typescript
- Super fast
- More flexible configuration
- Super small (production.min.js ~ 2kb) and tree shaking!
- [ ] Support emoji or diacritics

## usage

### install

```js
npm i didyoumean3
```

### return results

```js
// if none match return null
didyoumean3('', ['anything']); // null

// else will a object like 👇:
{
  winner: 'the best matched item',
  matches: [
    {
      score: 0.1,
      target: 'item'
    },
    //...
  ]
}

// or you can use a custom function to specify the result, just add an option "result"
didyoumean3('', ['anything'], { result: x => x || 'no matched!' });
```

### details

```js
const didyoumean3 = require('didyoumean3').default
// or if you are using TypeScript or ES module
import didyoumean3 from 'didyoumean3'

let input = 'insargrm'
let list = [
  'facebook', 'INSTAgram', ' in stagram', 'baidu', 'twitter', 'wechat', 'instagram', 'linkedin'
]

// levenshtein
didyoumean3(input, list)?.winner // instagram

// dice-coefficient
didyoumean3(input, list, { similar: 'dice' })?.winner // instagram


// or use your custom algorithm
// notice: If you customize the algorithm, the optimal route must take the minimum
const your_leven = require('some/your_leven');
const your_comparator = (a: number, b: number) => a < b;
didyoumean3(input, list, { similar: your_leven })


// specify the way you get the value
const val = item => item.id;
didyoumean3(input, [{id: 'facebook'}, {id: 'baidu'}, {id: 'instagram'}], { vaL })?.winner; // {id: 'instagram'}
```

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

export type Result <T extends string | object> = {
  winner: T,
  matches: ReadonlyArray<T>,
  [key: string]: any
} | null

/**
 * @type {boolean} ignore: ignore case 'A' -> 'a'
 * @type {boolean} trim: ' a bcs ' -> 'a bcs'
 * @type {boolean} trimAll: ' a bcs' -> 'abcs'
 * @type {boolean} diacritics: 'café' -> 'café'.normalize()
 * @type {Function} val: when you need find the best result in a object list, it's useful
 * @type {string | Function} similar: use builtin shortest edit-distance algorithm or yours
 * @type {Function} result: you can custom your return result
 * @type {Function} filter: you can filter the data into the returned results
 */
export type Options = {
  ignore?: boolean;
  trim?: boolean;
  trimAll?: boolean;
  diacritics?: boolean;
  normalize?: Normalize;
  val?: Val;
  similar?: BuiltInSimilar | Similar;
  result?: Return;
  filter?: Filter;
};
```

## benchmark

```js
didyoumean x 194,593 ops/sec ±1.07% (84 runs sampled)
didyoumean2 x 311,318 ops/sec ±0.63% (90 runs sampled)
didyoumean3-leven x 510,067 ops/sec ±0.48% (84 runs sampled)
didyoumean3-dice x 294,427 ops/sec ±0.46% (85 runs sampled)
Fastest is didyoumean3-leven
```

## contributors

nobody now.

> Both issure and pr are welcome!

## license

[MIT](./LICENSE)
