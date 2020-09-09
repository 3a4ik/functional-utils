import { curry } from '../core/curry';

export const uniq = array => {
  return Array.from(new Set(array));
};

export const uniqBy = curry((key, array) => {
  const lookup = {};

  return array.filter(object => {
    if (lookup[object[key]]) {
      return false;
    }

    lookup[object[key]] = true;

    return true;
  });
});

export const uniqWith = curry((comparator, array) => {
  return array.filter((value, idx, initialArray) => {
    const foundIdx = initialArray.findIndex(otherValue => comparator(value, otherValue));

    return foundIdx === -1 || foundIdx === idx;
  });
});
