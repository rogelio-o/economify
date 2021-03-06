import { parseResponse, parseBulkResponse } from 'utils/api';
import { unparseModel } from 'utils/form';
import { stringifyQuery } from 'utils/query';

export const createTransaction = transactionModel => {
  return fetch('http://localhost:4000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(transactionModel)),
  }).then(response => parseResponse(transactionModel, response));
};

export const createTransactions = transactionsModel => {
  return fetch('http://localhost:4000/transactions/bulk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transactions: transactionsModel.map(unparseModel) }),
  }).then(response => parseBulkResponse(transactionsModel, response));
};

export const updateTransaction = (transactionId, transactionModel) => {
  return fetch(`http://localhost:4000/transactions/${transactionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(transactionModel)),
  }).then(response => parseResponse(transactionModel, response));
};

export const getTransactionsPage = (page, filters) => {
  const filtersQuery = stringifyQuery(filters);
  return fetch(
    `http://localhost:4000/transactions?page=${page}&${filtersQuery}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};

export const deleteTransaction = transactionId => {
  return fetch(`http://localhost:4000/transactions/${transactionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.ok) {
      return;
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};

export const getTransaction = transactionId => {
  return fetch(`http://localhost:4000/transactions/${transactionId}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};

export const recategorizeTransactions = () => {
  return fetch('http://localhost:4000/transactions/recategorize', {
    method: 'POST',
  }).then(response => {
    if (response.ok) {
      return;
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};
