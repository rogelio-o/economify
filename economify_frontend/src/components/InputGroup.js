import React from 'react';
import { Input, Label, FormGroup } from 'reactstrap';
import InputGroupBase from 'components/InputGroupBase';

const createInput = ({
  id,
  label,
  model,
  handleChange,
  children,
  type,
  ...restProps
}) => (
  <Input
    name={id}
    id={id}
    value={model.value === null ? '' : model.value}
    onChange={event => handleChange(id, event.target.value)}
    invalid={model.errors.length > 0}
    type={type}
    {...restProps}
  >
    {children}
  </Input>
);

const createCheckbox = ({
  id,
  label,
  model,
  handleChange,
  children,
  type,
  ...restProps
}) => (
  <Input
    name={id}
    id={id}
    checked={model.value === null ? false : model.value}
    onChange={event => handleChange(id, event.target.checked)}
    invalid={model.errors.length > 0}
    type={type}
    {...restProps}
  >
    {children}
  </Input>
);

const InputGroup = ({ type, id, label, model, ...restProps }) => {
  const input =
    type === 'checkbox'
      ? createCheckbox({ type, id, label, model, ...restProps })
      : createInput({ type, id, label, model, ...restProps });
  return (
    <InputGroupBase id={id} label={label} model={model}>
      {type === 'checkbox' ? (
        <FormGroup check>
          <Label check>{input}</Label>
        </FormGroup>
      ) : (
        input
      )}
    </InputGroupBase>
  );
};

export default InputGroup;
