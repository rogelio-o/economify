import React from 'react';
import { Form } from 'reactstrap';
import InputGroup from 'components/InputGroup';
import InputGroupIssuers from 'components/InputGroupIssuers';

const CategoryRuleParamsForm = ({ model, handleChange }) => {
  if (model.type.value === 'concept') {
    return (
      <Form>
        <InputGroup
          id="concept"
          label="Concept"
          model={model.params.concept}
          handleChange={handleChange}
          type="text"
        />
      </Form>
    );
  } else {
    return (
      <Form>
        <InputGroupIssuers
          id="issuer_id"
          label="Issuer"
          model={model.params.issuer_id}
          handleChange={handleChange}
        />
      </Form>
    );
  }
};

export default CategoryRuleParamsForm;
