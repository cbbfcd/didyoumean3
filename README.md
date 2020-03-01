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

## Features

- Built-in fastest levenshtein algorithm
- Support custom return results
- Typescript
- Super fast
- More flexible configuration
- Super small (production.min.js < 2kb) and tree shaking! [more info](https://bundlephobia.com/result?p=didyoumean3@1.2.0)
- [ ] Support emoji or diacritics

## Usage

### install

```js
npm i didyoumean3
```

### use case

- **base use**

```js
import didyoumean3 from 'didyoumean3'
// or
const { didyoumean3 } = require('didyoumean3');

let input = 'insargrm'
let list = [
  'facebook', 'INSTAgram', ' in stagram', 'baidu', 'twitter', 'wechat', 'instagram', 'linkedin'
]

console.log(didyoumean3(input, list));

// will output:
// {
//   winner: 'instagram',
//   matched: [
//     {
//       score: 8,
//       target: 'facebook',
//     },
//     {
//       score: 3,
//       target: 'instagram',
//     },
//     {
//       score: 7,
//       target: 'linkedin',
//     },
//     // ...
//   ],
// }
```

- **optional configuration**

`didyoumea3` has some built-in string formatting configuration items：

* `ignore`: default is false, Case-insensitive 
* `trim`: default is true, will use `string.trim` format the string
* `trimAll`: defalut is false, will trim with regexp `/\s+/g`
* `diacritics`: default is false, just 'café' -> 'café'.normalize()
* `normalize`: customize the formatting function by yourself

🔥If these parameters don't meet your requirements, you can customize the formatting function through `normalize`.

🔥When using the custom normalize function, the above string formatting configurations will fail

```js
didyoumean3(input, target, { normalize: (s: string) => s.trim() } );
```

* `val`: sometimes, you need to match against a list of object. you can use `val` to get the target string out.

```js
let input = [
  { id: 'facebook' },
  { id: 'baidu' },
  { id: 'twitter' },
  { id: 'INSTAgram' },
  { id: ' in stagram' },
  { id: 'wechat' },
  { id: 'instagram' },
  { id: 'linkedin' },
];

didyoumean3(input, target, { val: item => item.id } );
```

* `result`: Customize the structure of the results you want to return

```js
// default result may be null or {winner: xx, matched: []}
type Res = null | { matched: any[], winner: string }

// you can custom your own result style!!
const result = (res: Res) => {
  if (!res) return 'nothing matched!'
  else return res
}

didyoumean3(input, target, { result } );
```
* `filter`: You can filter the results you want, such as those with a score greater than 5

```js
let i2 = 'insargrm';
let l2 = ['facebook', 'instagram', 'linkedin'];
expect(
  didyoumean3(i2, l2, { filter: (score: number, item: any) => score >= 7 })
    ?.matched.length
).toBe(2); 
```

## benchmark

```js
didyoumean x 194,593 ops/sec ±1.07% (84 runs sampled)
didyoumean2 x 311,318 ops/sec ±0.63% (90 runs sampled)
didyoumean3 x 510,067 ops/sec ±0.48% (84 runs sampled)
Fastest is didyoumean3-leven
```

## contributors

nobody now.

> Both issure and pr are welcome!

## license

[MIT](./LICENSE)
