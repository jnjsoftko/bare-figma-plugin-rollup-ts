/**
 * Pop Object key
 * 
 * @param obj - dict
 * @param key - string
 * 
 * @example
 * pop({'a': 1, 'b': 2}, 'a') => {'b': 2}
 */
export const pop = (obj, key) => {
  let val = obj[key];
  delete obj[key];
  return val;
}