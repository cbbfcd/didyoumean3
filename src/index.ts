import {
  normalize,
  similarFactory,
  resultFactory,
  getVal,
  Options,
} from './util';

import { dice } from './lib/dice';
import { leven } from './lib/leven';

const defaultOpts: Partial<Options> = {
  ignore: false,
  trim: true,
  trimAll: false,
  diacritics: false,
  filter: () => true,
};

const didyoumean3 = <T extends string | object>(
  s: string,
  t: ReadonlyArray<T>,
  opts?: Options
): any => {
  const { val, similar = 'leven', result, filter, ...cfg } = {
    ...defaultOpts,
    ...opts,
  };
  s = normalize(s, cfg);
  const res = resultFactory(result);

  if (!s) return res(null);

  const calc = similarFactory(similar);
  const matches = [];
  let winner: any = null;
  let temp: number | null = null;

  for (let i = 0, len = t.length; i < len; i++) {
    const target = t[i];
    const score = calc(s, normalize(getVal(target, val), cfg));

    filter!(score, target) && matches.push({ score, target });

    // May be the highest score or the lowest score
    if (temp === null || score < temp) {
      temp = score;
      winner = target;
    }
  }

  return res({ matches, winner });
};

didyoumean3.dice = dice;
didyoumean3.leven = leven;

export { didyoumean3 };

export default didyoumean3;
