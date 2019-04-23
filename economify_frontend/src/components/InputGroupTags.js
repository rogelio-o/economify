import React from 'react';
import TagsInput from 'react-tagsinput';
import InputGroupBase from 'components/InputGroupBase';

import 'react-tagsinput/react-tagsinput.css';

const InputGroupTags = ({ id, label, model, handleChange, ...restProps }) => {
  return (
    <InputGroupBase id={id} label={label} model={model}>
      <TagsInput
        name={id}
        id={id}
        value={model.value === null ? [] : model.value}
        onChange={event => handleChange(id, event)}
        invalid={model.errors.length > 0}
        {...restProps}
      />
    </InputGroupBase>
  );
};

export default InputGroupTags;
