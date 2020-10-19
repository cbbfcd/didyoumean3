import { normalize, resultFactory, Options } from './util';

import { leven } from './leven';

const defaultOpts: Partial<Options> = {
  ignore: false,
  trim: true,
  trimAll: false,
  diacritics: false,
  filter: () => true,
};

const didyoumean3 = <T extends string>(
  s: string,
  t: ReadonlyArray<T>,
  opts?: Options
): any => {
  const { result, filter, ...cfg } = {
    ...defaultOpts,
    ...opts,
  };
  s = normalize(s, cfg);
  const res = resultFactory(result);

  if (!s || !t || !t.length) return res(null);

  const matched = [];
  let winner: T | null = null;
  let temp: number | null = null;

  for (let i = 0, len = t.length; i < len; i++) {
    const target = t[i];
    const score = leven(s, normalize(target, cfg));

    filter!(score, target) && matched.push({ score, target });

    // May be the highest score or the lowest score
    if (temp === null || score < temp) {
      temp = score;
      winner = target;
    }
  }

  return res({ matched, winner });
};

didyoumean3.leven = leven;

export { didyoumean3 };

export default didyoumean3;
