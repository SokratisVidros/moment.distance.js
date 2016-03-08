export default function format({phrase = '', count =  1, pluralSuffix = 's'} = {}) {
  return phrase
    .replace(/%d/i, count)
    .replace(/%s/i, count > 1 ? pluralSuffix : '');
};
