import queryString from 'query-string';

export const getQueryParam = (queryStr, key) => {
  const values = queryString.parse(queryStr);

  return values[key];
};

export const stringifyQuery = obj => {
  return queryString.stringify(obj);
};
