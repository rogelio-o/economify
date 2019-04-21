import { parseResponse } from 'utils/api';
import { unparseModel } from 'utils/form';

export const createCategoryRule = (categoryId, ruleModel) => {
  return fetch(`http://localhost:4000/categories/${categoryId}/rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(unparseModel(ruleModel)),
  }).then(response => parseResponse(ruleModel, response));
};

export const updateCategoryRule = (categoryId, categoryRuleId, ruleModel) => {
  return fetch(
    `http://localhost:4000/categories/${categoryId}/rules/${categoryRuleId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(unparseModel(ruleModel)),
    },
  ).then(response => parseResponse(ruleModel, response));
};

export const getCategoriesRulesPage = (categoryId, page) => {
  return fetch(
    `http://localhost:4000/categories/${categoryId}/rules?page=${page}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};

export const deleteCategoryRule = (categoryId, categoryRuleId) => {
  return fetch(
    `http://localhost:4000/categories/${categoryId}/rules/${categoryRuleId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then(response => {
    if (response.ok) {
      return;
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};

export const getCategoryRule = (categoryId, categoryRuleId) => {
  return fetch(
    `http://localhost:4000/categories/${categoryId}/rules/${categoryRuleId}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error ${response.status}`);
    }
  });
};
