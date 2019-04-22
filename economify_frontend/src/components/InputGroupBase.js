import React from 'react';
import { FormGroup, Label, Col } from 'reactstrap';
import FormError from 'components/FormError';

const InputGroupBase = ({ id, label, model, children }) => {
  return (
    <FormGroup row>
      <Label for={id} sm={2}>
        {label}
      </Label>
      <Col sm={10}>
        {children}
        <FormError errors={model.errors} />
      </Col>
    </FormGroup>
  );
};

export default InputGroupBase;
