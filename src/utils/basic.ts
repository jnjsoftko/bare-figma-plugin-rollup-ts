/**
 * Pop Object key
 * 
 * @param obj - 
 * @param key - 
 */
export const pop = (obj, key) => {
  var val = obj[key];
  delete obj[key];
  return val;
}