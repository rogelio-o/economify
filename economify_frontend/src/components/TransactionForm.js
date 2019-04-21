import React from 'react';
import { Alert, Form } from 'reactstrap';
import Typography from 'components/Typography';
import InputGroup from 'components/InputGroup';
import FormSubmitButton from 'components/FormSubmitButton';

const renderMsgs = (msgs, color) => {
  if (msgs.length === 0) {
    return null;
  } else {
    return (
      <Alert color={color}>
        {msgs.map(msg => (
          <Typography>{msg}</Typography>
        ))}
      </Alert>
    );
  }
};

const TransactionForm = ({
  model,
  loading,
  handleChange,
  handleSubmit,
  successMsgs,
  errorsMsgs,
}) => {
  return (
    <Form>
      {renderMsgs(successMsgs, 'success')}
      {renderMsgs(errorsMsgs, 'danger')}
      <InputGroup
        id="concept"
        label="Concept"
        model={model.concept}
        handleChange={handleChange}
        type="text"
      />
      <InputGroup
        id="date"
        label="Date"
        model={model.date}
        handleChange={handleChange}
        type="date"
      />
      <InputGroup
        id="amount"
        label="Amount"
        model={model.amount}
        handleChange={handleChange}
        type="number"
        step="0.01"
      />
      <InputGroup
        id="bank_id"
        label="Bank"
        model={model.bank_id}
        handleChange={handleChange}
        type="text"
      />
      <InputGroup
        id="issuer_id"
        label="Issuer"
        model={model.issuer_id}
        handleChange={handleChange}
        type="text"
      />
      <InputGroup
        id="category_id"
        label="Category"
        model={model.category_id}
        handleChange={handleChange}
        type="text"
      />
      <FormSubmitButton loading={loading} handleSubmit={handleSubmit} />
    </Form>
  );
};

export default TransactionForm;
