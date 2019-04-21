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

const BankAccountForm = ({
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
        id="name"
        label="Name"
        model={model.name}
        handleChange={handleChange}
        type="text"
      />
      <InputGroup
        id="description"
        label="Description"
        model={model.description}
        handleChange={handleChange}
        type="textarea"
      />
      <FormSubmitButton loading={loading} handleSubmit={handleSubmit} />
    </Form>
  );
};

export default BankAccountForm;
