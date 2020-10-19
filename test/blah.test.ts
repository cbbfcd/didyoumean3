import { didyoumean3 } from '../src';

const { leven } = didyoumean3;

let input = 'insargrm';
let list = [
  'facebook',
  'INSTAgram',
  ' in stagram',
  'baidu',
  'twitter',
  'wechat',
  'instagram',
  'linkedin',
];

describe('matching against a list of strings', () => {
  it('use leven as default', () => {
    expect(didyoumean3(input, list)?.winner).toBe('instagram');
  });

  it('use leven as default with ignore = true', () => {
    expect(didyoumean3(input, list, { ignore: true })?.winner).toBe(
      'INSTAgram'
    );
  });

  it('use leven as default with trimAll = true', () => {
    expect(didyoumean3(input, list, { trimAll: true })?.winner).toBe(
      ' in stagram'
    );
  });
});

let l = [
  { id: 'facebook' },
  { id: 'baidu' },
  { id: 'twitter' },
  { id: 'INSTAgram' },
  { id: ' in stagram' },
  { id: 'wechat' },
  { id: 'instagram' },
  { id: 'linkedin' },
];

describe('matching against a list of object', () => {
  const mapVal = (item: any) => item!.id;

  it('use leven as default', () => {
    expect(didyoumean3(input, l.map(mapVal))?.winner).toEqual('instagram');
  });

  it('use leven as default with ignore = true', () => {
    expect(didyoumean3(input, l.map(mapVal), { ignore: true })?.winner).toEqual('INSTAgram');
  });

  it('use leven as default with trimAll = true', () => {
    expect(didyoumean3(input, l.map(mapVal), { trimAll: true })?.winner).toEqual(' in stagram');
  });
});

let i2 = 'insargrm';
let l2 = ['facebook', 'instagram', 'linkedin'];

describe('test output when matching against a list of strings', () => {
  it('use levem as default', () => {
    expect(didyoumean3(i2, l2)).toEqual({
      winner: 'instagram',
      matched: [
        {
          score: 8,
          target: 'facebook',
        },
        {
          score: 3,
          target: 'instagram',
        },
        {
          score: 7,
          target: 'linkedin',
        },
      ],
    });
  });
});

describe('test leven', () => {
  it('test dice with empty params', () => {
    expect(leven('', 'hello')).toBe(5);
    expect(leven('hello', '')).toBe(5);
  });
});

// TODO: add test case for utils

describe('test some boundary conditions for coverage test', () => {
  const normalize = (x: string) => x.replace(/_/g, '');
  const result = (x: any) => ({ ...x, ...{ first: x.winner } });

  it('use leven as default with an empty input', () => {
    expect(didyoumean3('', ['anything', '  ', ''])).toBe(null);
  });

  it('use leven as default with custom normalize function', () => {
    expect(
      didyoumean3('_hello_', ['-hello', '_hello'], { normalize })?.winner
    ).toBe('_hello');
  });

  it('use leven as default with diacritics = true', () => {
    expect(
      didyoumean3('résumé', ['resume', 'resumé'], { diacritics: true })?.winner
    ).toBe('resumé');
  });

  it('custom our return result', () => {
    expect(
      didyoumean3('hello', ['hell', 'world', 'HELLO'], { result, ignore: true })
        ?.first
    ).toBe('HELLO');
  });

  it('filter the result', () => {
    let i2 = 'insargrm';
    let l2 = ['facebook', 'instagram', 'linkedin'];
    expect(
      didyoumean3(i2, l2, { filter: (score: number) => score >= 7 })?.matched
        .length
    ).toBe(2);
  });
});
