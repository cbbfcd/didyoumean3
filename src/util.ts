export interface Return {
  (x: any): any;
}

export interface Normalize {
  (x: string): string;
}

export interface Filter {
  (score: number, target: string | object): boolean;
}

/**
 * @type {boolean} ignore: ignore case 'A' -> 'a'
 * @type {boolean} trim: ' a bcs ' -> 'a bcs'
 * @type {boolean} trimAll: ' a bcs' -> 'abcs'
 * @type {boolean} diacritics: 'café' -> 'café'.normalize()
 * @type {Function} normalize: you can formatter the string yourself
 * @type {Function} result: you can custom your return result
 * @type {Function} filter: you can filter the data into the returned results
 */
export type Options = {
  ignore?: boolean;
  trim?: boolean;
  trimAll?: boolean;
  diacritics?: boolean;
  normalize?: Normalize;
  result?: Return;
  filter?: Filter;
};

export const isFunction = (f: any) =>
  !!(f && f.constructor && f.call && f.apply);

export const normalize = (
  s: string = '',
  { normalize, trim, ignore, trimAll, diacritics }: Partial<Options>
): string => {
  if (isFunction(normalize)) return normalize!(s);

  trim && (s = s.trim());
  trimAll && (s = s.replace(/\s+/g, ''));
  diacritics && (s = s.normalize());
  ignore && (s = s.toLowerCase());

  return s;
};

export const resultFactory = (res?: Return) => (r: any) =>
  isFunction(res) ? res!(r) : r;
