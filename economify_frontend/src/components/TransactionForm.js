import React from 'react';
import { Alert, Form } from 'reactstrap';
import Typography from 'components/Typography';
import InputGroup from 'components/InputGroup';
import InputGroupIssuers from 'components/InputGroupIssuers';
import InputGroupCategories from 'components/InputGroupCategories';
import InputGroupBanks from 'components/InputGroupBanks';
import FormSubmitButton from 'components/FormSubmitButton';

const renderMsgs = (msgs, color) => {
  if (msgs.length === 0) {
    return null;
  } else {
    return (
      <Alert color={color}>
        {msgs.map((msg, index) => (
          <Typography key={index}>{msg}</Typography>
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
      <InputGroupBanks
        id="bank_id"
        label="Bank"
        model={model.bank_id}
        handleChange={handleChange}
      />
      <InputGroupIssuers
        id="issuer_id"
        label="Issuer"
        model={model.issuer_id}
        handleChange={handleChange}
      />
      <InputGroupCategories
        id="category_id"
        label="Category"
        model={model.category_id}
        handleChange={handleChange}
      />
      <InputGroup
        id="category_locked"
        label="Lock category"
        model={model.category_locked}
        handleChange={handleChange}
        type="checkbox"
      />
      <FormSubmitButton loading={loading} handleSubmit={handleSubmit} />
    </Form>
  );
};

export default TransactionForm;
