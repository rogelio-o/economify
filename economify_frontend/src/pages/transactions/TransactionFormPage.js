import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import Page from 'components/Page';

const TransactionFormPage = () => {
  return (
    <Page
      title="Create Transaction"
      breadcrumbs={[{ name: 'Transactions' }, { name: 'Create', active: true }]}
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardBody>
              <Form>
                <FormGroup row>
                  <Label for="concept" sm={2}>
                    Concept
                  </Label>
                  <Col sm={10}>
                    <Input type="text" name="concept" id="concept" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="amount" sm={2}>
                    Amount
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="amount"
                      id="amount"
                      step="0.01"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="date" sm={2}>
                    Date
                  </Label>
                  <Col sm={10}>
                    <Input type="date" name="date" id="date" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="bank-account" sm={2}>
                    Bank Account
                  </Label>
                  <Col sm={10}>
                    <Input type="select" name="bank_account" id="bank-account">
                      <option value="1">Account 1</option>
                      <option value="2">Account 2</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="issuer" sm={2}>
                    Issuer
                  </Label>
                  <Col sm={10}>
                    <Input type="text" name="issuer" id="issuer" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default TransactionFormPage;
