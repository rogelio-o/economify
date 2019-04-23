export const parseModel = values => {
  const model = {};

  for (let key of Object.keys(values)) {
    const value = values[key];
    if (typeof value === 'object' && value !== null) {
      model[key] = parseModel(value);
    } else {
      model[key] = {
        value,
        errors: [],
      };
    }
  }

  return model;
};

export const unparseModel = model => {
  const values = {};
  for (let key of Object.keys(model)) {
    const value = model[key];
    if (value !== null && value.value === undefined) {
      values[key] = unparseModel(value);
    } else {
      values[key] = value.value;
    }
  }

  return values;
};
