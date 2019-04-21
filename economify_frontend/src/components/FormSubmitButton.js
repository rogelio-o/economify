import React from 'react';
import { FormGroup, Col } from 'reactstrap';
import Button from 'reactstrap-button-loader';

const FormSubmitButton = ({ loading, handleSubmit }) => {
  return (
    <FormGroup row>
      <Col sm={{ size: 10, offset: 2 }}>
        <Button loading={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </Col>
    </FormGroup>
  );
};

export default FormSubmitButton;
