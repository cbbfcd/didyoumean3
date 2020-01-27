import builtin from './lib';

export interface Val {
  (x: string | object): string;
}

export interface Similar {
  (a: string, b: string, opts?: Partial<Options>): number;
}

export interface Return {
  (x: any): any;
}

export interface Normalize {
  (x: string): string;
}

export interface Filter {
  (score: number, target: string | object): boolean; 
}

export type BuiltInSimilar = 'dice' | 'leven';

/**
 * @type {boolean} ignore: ignore case 'A' -> 'a'
 * @type {boolean} trim: ' a bcs ' -> 'a bcs'
 * @type {boolean} trimAll: ' a bcs' -> 'abcs'
 * @type {boolean} diacritics: 'café' -> 'café'.normalize()
 * @type {Function} val: when you need find the best result in a object list, it's useful
 * @type {string | Function} similar: use builtin shortest edit-distance algorithm or yours
 * @type {Function} result: you can custom your return result
 * @type {Function} filter: you can filter the data into the returned results
 */
export type Options = {
  ignore?: boolean;
  trim?: boolean;
  trimAll?: boolean;
  diacritics?: boolean;
  normalize?: Normalize;
  val?: Val;
  similar?: BuiltInSimilar | Similar;
  result?: Return;
  filter?: Filter;
};

export const isFunction = (f: any) =>
  !!(f && f.constructor && f.call && f.apply);

export const normalize = (
  s: string,
  { normalize, trim, ignore, trimAll, diacritics }: Partial<Options>
): string => {
  if (isFunction(normalize)) return normalize!(s);

  trim && (s = s.trim());
  trimAll && (s = s.replace(/\s+/g, ''));
  diacritics && (s = s.normalize());
  ignore && (s = s.toLowerCase());

  return s;
};

export const similarFactory = <T extends BuiltInSimilar | Similar>(s: T) =>
  isFunction(s) ? (s as Similar) : (builtin[s as BuiltInSimilar] as Similar);

export const getVal = <T extends string | object>(i: T, k?: Val): string => {
  return typeof i === 'string' ? i : isFunction(k) ? k!(i) : '';
};

export const resultFactory = (res?: Return) => (r: any) =>
  isFunction(res) ? res!(r) : r;
