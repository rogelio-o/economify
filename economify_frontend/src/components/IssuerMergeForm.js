import React from 'react';
import { Form } from 'reactstrap';
import InputGroupIssuers from 'components/InputGroupIssuers';
import FormSubmitButton from 'components/FormSubmitButton';

const IssuerMergeForm = ({ model, loading, handleChange, handleSubmit }) => {
  return (
    <Form>
      <InputGroupIssuers
        id="other_issuer_id"
        label="Other Issuer"
        model={model.other_issuer_id}
        handleChange={handleChange}
      />
      <FormSubmitButton loading={loading} handleSubmit={handleSubmit} />
    </Form>
  );
};

export default IssuerMergeForm;
