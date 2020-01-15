import { didyoumean3 } from '../src';
import { Val } from '../src/util';

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
