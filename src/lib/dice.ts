const bigrams = (s: string): string[] => {
  const grams: string[] = [];

  const l = ~-s.length;
  if (!l) return [s];

  let i = -1;
  while (++i < l) grams[i] = s.slice(i, i + 2);

  return grams;
};

export const dice = (a: string, b: string): number => {
  if (a === b) return 1;

  let la = a.length;
  let lb = b.length;

  if (!la || !lb) return 0;

  let l = bigrams(a);
  let r = bigrams(b);

  la = l.length;
  lb = r.length;
  let i,
    c = 0;

  for (i = 0; i < la; i++) r.includes(l[i]) && c++;

  return (2 * c) / (la + lb);
};
