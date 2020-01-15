const V: number[] = [];
const C: number[] = [];

// talisman
export const leven = (a: string, b: string): number => {
  if (a === b) return 0;

  // switch
  const temp = a;
  if (a.length > b.length) {
    a = b;
    b = temp;
  }

  let la = a.length;
  let lb = b.length;

  if (!la) return lb;
  if (!lb) return la;

  // trim common suffix, that's the reson why we need swith the params according to it's length
  while (la > 0 && a.charCodeAt(~-la) === b.charCodeAt(~-lb)) {
    la--;
    lb--;
  }

  if (!la) return lb;

  let start = 0;
  while (start < la && a.charCodeAt(start) === b.charCodeAt(start)) start++;

  la -= start;
  lb -= start;

  if (!la) return lb;

  let i = 0;

  // metrics
  // left, right, diagonally left, dl = if char equal, diagonally left + 0 else + 1
  // Math.min(left + 1, right + 1, dl)
  /**
   *   *   *   a   b   c
   *   |   |   |   |   |
   *   * - 0 - 1 - 2 - 3
   *   |   |   |   |   |
   *   a - 1 - 0 - 1 - 2
   *   |   |   |   |   |
   *   b - 2 - 1 - 0 - 1
   *   |   |   |   |   |
   *   d - 3 - 2 - 1 - 1 <- result
   */
  while (i < lb) {
    C[i] = b.charCodeAt(start + i);
    V[i] = ++i;
  }

  let curr = 0,
    above,
    left,
    charA,
    j;

  for (i = 0; i < la; i++) {
    left = i;
    curr = i + 1;
    charA = a.charCodeAt(start + i);

    for (j = 0; j < lb; j++) {
      above = curr;

      curr = left;
      left = V[j];

      if (charA !== C[j]) {
        if (left < curr) curr = left;
        if (above < curr) curr = above;
        curr++;
      }

      V[j] = curr;
    }
  }

  return curr;
};
