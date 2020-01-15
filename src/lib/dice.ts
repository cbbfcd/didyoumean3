export const dice = (a: string, b: string): number => {
  let lena = a.length;
  let lenb = b.length;

  // boundary conditions
  if (!lena && !lenb) return 1;
  if (!lena || !lenb) return 0;
  if (a === b) return 1;
  // means when the words like 'ab' with 'a', it works not well
  if (lena < 2 || lenb < 2) return 0;

  let map = new Map();

  let e = 0; // intersections
  let r: string; // bigrams
  let c: number; // counter

  let i = -1;
  let t = lena - 1;
  while (++i < t) {
    r = a.substring(i, i + 2);
    c = map.has(r) ? map.get(r) + 1 : 1;

    map.set(r, c);
  }

  i = -1;
  t = lenb - 1;
  while (++i < t) {
    r = b.substring(i, i + 2);
    c = map.has(r) ? map.get(r) : 0;

    if (c > 0) {
      e++;
      map.set(r, ~-c);
    }
  }

  return (2 * e) / (lena + lenb - 2);
};
