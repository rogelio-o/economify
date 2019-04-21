import { parseResponse } from 'utils/api';
import { unparseModel } from 'utils/form';

export const createCategory = categoryModel => {
  return fetch('http://localhost:4000/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(categoryModel)),
  }).then(response => parseResponse(categoryModel, response));
};

export const updateCategory = (categoryId, categoryModel) => {
  return fetch(`http://localhost:4000/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(categoryModel)),
  }).then(response => parseResponse(categoryModel, response));
};

export const getCategoriesPage = page => {
  return fetch(`http://localhost:4000/categories?page=${page}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};

export const deleteCategory = categoryId => {
  return fetch(`http://localhost:4000/categories/${categoryId}`, {
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

export const getCategory = categoryId => {
  return fetch(`http://localhost:4000/categories/${categoryId}`).then(
    response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}`);
      }
    },
  );
};
