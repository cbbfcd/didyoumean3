/* globals bench suite */
'use strict';
const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

const input = 'insargrm'
const list = [
  'facebook', 'INSTAgram', ' in stagram', 'baidu', 'twitter', 'wechat', 'instagram', 'linkedin'
]

const didyoumean = require('didyoumean')
const didyoumean2 = require('didyoumean2').default
const didyoumean3 = require('./dist/didyoumean3.cjs.production.min.js').default

function run(fn, opts) {
  if (opts) fn(input, list, opts)
  else fn(input, list)
}

suite
  .add('didyoumean', () => {
    run(didyoumean)
  })
  .add('didyoumean2', () => {
    run(didyoumean2)
  })
  .add('didyoumean3', () => {
    run(didyoumean3)
  })
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true })


