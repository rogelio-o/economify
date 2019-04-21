export const parseModel = values => {
  const model = {};
  for (let key of Object.keys(values)) {
    model[key] = {
      value: values[key],
      errors: [],
    };
  }

  return model;
};

export const unparseModel = model => {
  const values = {};
  for (let key of Object.keys(model)) {
    values[key] = model[key].value;
  }

  return values;
};
