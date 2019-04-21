import { parseResponse } from 'utils/api';
import { unparseModel } from 'utils/form';

export const createBankAccount = bankAccountModel => {
  return fetch('http://localhost:4000/banks/accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(bankAccountModel)),
  }).then(response => parseResponse(bankAccountModel, response));
};

export const updateBankAccount = (bankAccountId, bankAccountModel) => {
  return fetch(`http://localhost:4000/banks/accounts/${bankAccountId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(bankAccountModel)),
  }).then(response => parseResponse(bankAccountModel, response));
};

export const getBanksAccountsPage = page => {
  return fetch(`http://localhost:4000/banks/accounts?page=${page}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};

export const deleteBankAccount = bankAccountId => {
  return fetch(`http://localhost:4000/banks/accounts/${bankAccountId}`, {
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

export const getBankAccount = bankAccountId => {
  return fetch(`http://localhost:4000/banks/accounts/${bankAccountId}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};
