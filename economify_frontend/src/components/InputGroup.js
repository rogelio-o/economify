import React from 'react';
import { Input } from 'reactstrap';
import InputGroupBase from 'components/InputGroupBase';

const InputGroup = ({
  id,
  label,
  model,
  handleChange,
  children,
  ...restProps
}) => {
  return (
    <InputGroupBase id={id} label={label} model={model}>
      <Input
        name={id}
        id={id}
        value={model.value === null ? '' : model.value}
        onChange={event => handleChange(id, event.target.value)}
        invalid={model.errors.length > 0}
        {...restProps}
      >
        {children}
      </Input>
    </InputGroupBase>
  );
};

export default InputGroup;
