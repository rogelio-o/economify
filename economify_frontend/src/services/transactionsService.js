import { parseResponse } from 'utils/api';
import { unparseModel } from 'utils/form';

export const createTransaction = transactionModel => {
  return fetch('http://localhost:4000/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(transactionModel)),
  }).then(response => parseResponse(transactionModel, response));
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

export const getTransactionsPage = page => {
  return fetch(`http://localhost:4000/transactions?page=${page}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
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
