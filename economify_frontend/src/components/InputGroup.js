import React from 'react';
import { FormGroup, Input, Label, Col } from 'reactstrap';
import FormError from 'components/FormError';

const InputGroup = ({
  id,
  label,
  model,
  handleChange,
  children,
  ...restProps
}) => {
  return (
    <FormGroup row>
      <Label for={id} sm={2}>
        {label}
      </Label>
      <Col sm={10}>
        <Input
          name={id}
          id={id}
          value={model.value}
          onChange={event => handleChange(id, event)}
          invalid={model.errors.length > 0}
          {...restProps}
        >
          {children}
        </Input>
        <FormError errors={model.errors} />
      </Col>
    </FormGroup>
  );
};

export default InputGroup;
