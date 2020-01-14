import { didyoumean3, dice } from '../src';

let input = 'abcdefg'
let list = [
  'abc*******',
  'abcd******',
  'abcde*****',
  'ABCDEF****',
  'abcde*g***',
  'abcdef****'
]

describe('test dice function which use dice-coefficient algorithm', () => {
  it('withoud options', () => {
    expect(dice('abc', 'abc')).toBe(1)
    expect(dice('ab', 'ab')).toBe(1)
    expect(dice('a', 'a')).toBe(1)
    expect(dice('a', 'A')).toBe(0)
    expect(dice('abc', 'xy')).toBe(0)
    expect(dice('abc', '')).toBe(0)
    expect(dice('abc', 'abd')).toBe(0.3333333333333333)
    expect(dice('hello', 'hallo')).toBe(0.4)
    expect(dice('ab', 'ac')).toBe(0)
    expect(dice('ab', 'a')).toBe(0)
    expect(dice('abc', 'ab')).toBe(0.4)
    expect(dice('🔥', '🔥')).toBe(1)
  })
})

// some test case from didyoumean
describe(`test didyoumean3 with didyoumean's case`, () => {
  let input = 'insargrm'
  let list = ['facebook', 'twitter', 'instagram', 'linkedin'];
  
  it('Matching against a list of strings', () => {
    expect(didyoumean3(input, list)).toBe('instagram')
  })

  it('shoule match nothing', () => {
    expect(didyoumean3('baidu plus', list)?.first).toBe(null)
  })

  it('Matching against a list of objects', () => {
    let input = 'insargrm';
    let list = [ { id: 'facebook' }, { id: 'twitter' }, { id: 'instagram' }, { id: 'linkedin' } ];
    let key = 'id';
    expect(didyoumean3(input, list, {key})?.first).toEqual({ id: 'instagram' })
  })
})

// some test case from didyoumean2
describe('test didyoumean3 without emoji or diacritics', () => {
  it('without options', () => {
    expect(didyoumean3(input, list)).toEqual({
      first: 'abcdef****',
      matches: [
        {
          "score": 0.23529411764705882,
          "target": "abc*******",
        },
        {
          "score": 0.35294117647058826,
          "target": "abcd******",
        },
        {
          "score": 0.47058823529411764,
          "target": "abcde*****",
        },
        {
          "score": 0,
          "target": "ABCDEF****",
        },
        {
          "score": 0.47058823529411764,
          "target": "abcde*g***",
        },
        {
          "score": 0.5882352941176471,
          "target": "abcdef****",
        }
      ]
    })
  })

  it('with options', () => {
    expect(didyoumean3(input, list, {ignore: true, trim: true})).toEqual({
      first: 'ABCDEF****',
      matches: [
        {
          "score": 0.23529411764705882,
          "target": "abc*******",
        },
        {
          "score": 0.35294117647058826,
          "target": "abcd******",
        },
        {
          "score": 0.47058823529411764,
          "target": "abcde*****",
        },
        {
          "score": 0.5882352941176471,
          "target": "ABCDEF****",
        },
        {
          "score": 0.47058823529411764,
          "target": "abcde*g***",
        },
        {
          "score": 0.5882352941176471,
          "target": "abcdef****",
        }
      ]
    })
  })
})
