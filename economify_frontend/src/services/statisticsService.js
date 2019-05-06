export const getStatisticsByCategory = year => {
  return fetch(
    `http://localhost:4000/transactions/statistics/category/${year}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};

export const getStatisticsSaves = year => {
  return fetch(
    `http://localhost:4000/transactions/statistics/saves/${year}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};
