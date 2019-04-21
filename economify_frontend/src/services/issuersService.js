import { parseResponse } from 'utils/api';
import { unparseModel } from 'utils/form';

export const createIssuer = issuerModel => {
  return fetch('http://localhost:4000/transactions/issuers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(issuerModel)),
  }).then(response => parseResponse(issuerModel, response));
};

export const updateIssuer = (issuerId, issuerModel) => {
  return fetch(`http://localhost:4000/transactions/issuers/${issuerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(issuerModel)),
  }).then(response => parseResponse(issuerModel, response));
};

export const getIssuersPage = page => {
  return fetch(`http://localhost:4000/transactions/issuers?page=${page}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};

export const deleteIssuer = issuerId => {
  return fetch(`http://localhost:4000/transactions/issuers/${issuerId}`, {
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

export const getIssuer = issuerId => {
  return fetch(`http://localhost:4000/transactions/issuers/${issuerId}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};
