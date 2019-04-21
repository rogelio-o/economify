import React from 'react';
import { FormFeedback } from 'reactstrap';

const FormErrors = ({ errors }) => {
  if (errors.length === 0) {
    return [];
  } else {
    return <FormFeedback>{errors.join(', ')}</FormFeedback>;
  }
};

export default FormErrors;
