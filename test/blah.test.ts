import { didyoumean3 } from '../src';
import { Val } from '../src/util';

const { leven, dice } = didyoumean3;

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

  it('use dice-coefficient', () => {
    expect(didyoumean3(input, list, { similar: 'dice' })?.winner).toBe(
      'instagram'
    );
  });

  it('use leven as default with ignore = true', () => {
    expect(didyoumean3(input, list, { ignore: true })?.winner).toBe(
      'INSTAgram'
    );
  });

  it('use dice-coefficient with ignore = true', () => {
    expect(
      didyoumean3(input, list, { similar: 'dice', ignore: true })?.winner
    ).toBe('INSTAgram');
  });

  it('use leven as default with trimAll = true', () => {
    expect(didyoumean3(input, list, { trimAll: true })?.winner).toBe(
      ' in stagram'
    );
  });

  it('use dice-coefficient with trimAll = true', () => {
    expect(
      didyoumean3(input, list, { similar: 'dice', trimAll: true })?.winner
    ).toBe(' in stagram');
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
  const val: Val = (item: any) => item!.id;

  it('use leven as default', () => {
    expect(didyoumean3(input, l, { val })?.winner).toEqual({ id: 'instagram' });
  });

  it('use dice-coefficient', () => {
    expect(didyoumean3(input, l, { similar: 'dice', val })?.winner).toEqual({
      id: 'instagram',
    });
  });

  it('use leven as default with ignore = true', () => {
    expect(didyoumean3(input, l, { ignore: true, val })?.winner).toEqual({
      id: 'INSTAgram',
    });
  });

  it('use dice-coefficient with ignore = true', () => {
    expect(
      didyoumean3(input, l, { similar: 'dice', ignore: true, val })?.winner
    ).toEqual({ id: 'INSTAgram' });
  });

  it('use leven as default with trimAll = true', () => {
    expect(didyoumean3(input, l, { trimAll: true, val })?.winner).toEqual({
      id: ' in stagram',
    });
  });

  it('use dice-coefficient with trimAll = true', () => {
    expect(
      didyoumean3(input, l, { similar: 'dice', trimAll: true, val })?.winner
    ).toEqual({ id: ' in stagram' });
  });
});

let i2 = 'insargrm';
let l2 = ['facebook', 'instagram', 'linkedin'];

describe('test output when matching against a list of strings', () => {
  it('use levem as default', () => {
    expect(didyoumean3(i2, l2)).toEqual({
      winner: 'instagram',
      matches: [
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

  it('use dice-coefficient', () => {
    expect(didyoumean3(i2, l2, { similar: 'dice' })).toEqual({
      winner: 'instagram',
      matches: [
        {
          score: 0,
          target: 'facebook',
        },
        {
          score: 0.4,
          target: 'instagram',
        },
        {
          score: 0.14285714285714285,
          target: 'linkedin',
        },
      ],
    });
  });
});

// TODO: add more test case for leven and dice-coefficient
describe('test dice', () => {
  it('test dice with empty params', () => {
    expect(dice('', 'hello')).toBe(0);
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
  const compartor = (a: number, b: number) => a < b;

  it('use leven as default with an empty input', () => {
    expect(didyoumean3('', ['anything', '  ', ''])).toBe(null);
  });

  it('use dice-coefficient with an empty input', () => {
    expect(didyoumean3('', ['anything', '  ', ''], { similar: 'dice' })).toBe(
      null
    );
  });

  it('use leven as default with custom normalize function', () => {
    expect(
      didyoumean3('_hello_', ['-hello', '_hello'], { normalize })?.winner
    ).toBe('_hello');
  });

  it('use dice-coefficient with custom normalize function', () => {
    expect(
      didyoumean3('_hello_', ['-hello', '_hello'], {
        similar: 'dice',
        normalize,
      })?.winner
    ).toBe('_hello');
  });

  it('use leven as default with diacritics = true', () => {
    expect(
      didyoumean3('résumé', ['resume', 'resumé'], { diacritics: true })?.winner
    ).toBe('resumé');
  });

  it('use dice-coefficient with diacritics = true', () => {
    expect(
      didyoumean3('résumé', ['resume', 'resumé'], {
        similar: 'dice',
        diacritics: true,
      })?.winner
    ).toBe('resumé');
  });

  it('custom our algorithm and you must custom the comprator', () => {
    expect(
      didyoumean3('hello', ['hell', 'world', 'HELLO'], {
        similar: leven,
        compartor,
      })?.winner
    ).toBe('hell');
  });

  it('custom our return result', () => {
    expect(
      didyoumean3('hello', ['hell', 'world', 'HELLO'], { result, ignore: true })
        ?.first
    ).toBe('HELLO');
  });

  it('use dice-coefficient with single str', () => {
    expect(
      didyoumean3('h', ['hell', 'world', 'HELLO'], {
        ignore: true,
        similar: 'dice',
      })?.winner
    ).toBe('hell');
  });
});
