import React from 'react';
import { FormGroup, Label, Col } from 'reactstrap';
import FormError from 'components/FormError';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';

const InputGroupTags = ({ id, label, model, handleChange, ...restProps }) => {
  return (
    <FormGroup row>
      <Label for={id} sm={2}>
        {label}
      </Label>
      <Col sm={10}>
        <TagsInput
          name={id}
          id={id}
          value={model.value}
          onChange={event => handleChange(id, event)}
          invalid={model.errors.length > 0}
          {...restProps}
        />
        <FormError errors={model.errors} />
      </Col>
    </FormGroup>
  );
};

export default InputGroupTags;
