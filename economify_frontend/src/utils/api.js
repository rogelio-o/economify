import { parseModel } from 'utils/form';

export const parseResponse = async (model, response) => {
  if (response.status === 422) {
    const errors = await response.json();
    const newModel = Object.assign({}, model);
    for (let key of Object.keys(errors)) {
      newModel[key].errors = errors[key];
    }

    return {
      success: false,
      errors: [],
      model: newModel,
    };
  } else if (response.ok) {
    return {
      success: true,
      model: parseModel(await response.json()),
      errors: [],
    };
  } else {
    throw new Error(`Error ${response.status}.`);
  }
};

export const parseBulkResponse = async (models, response) => {
  if (response.ok) {
    const results = await response.json();
    return results.results.map((result, index) => {
      if (result.success) {
        return {
          success: true,
          model: parseModel(result.result),
          errors: [],
        };
      } else {
        const errors = result.errors;
        const newModel = Object.assign({}, models[index]);
        for (let key of Object.keys(errors)) {
          newModel[key].errors = errors[key];
        }

        return {
          success: false,
          errors: [],
          model: newModel,
        };
      }
    });
  } else {
    throw new Error(`Error ${response.status}.`);
  }
};
