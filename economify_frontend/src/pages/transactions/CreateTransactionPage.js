import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import TransactionForm from 'components/TransactionForm';
import { createTransaction } from 'services/transactionsService';
import { parseModel } from 'utils/form';

class CreateTransactionPage extends React.Component {
  state = {
    model: parseModel({
      concept: '',
      date: '',
      amount: '',
      bank_id: '',
      issuer_id: '',
      category_id: '',
    }),
    errorsMsgs: [],
    loading: false,
  };

  handleChange(name, value) {
    this.setState({
      model: {
        ...this.state.model,
        [name]: {
          value: value,
          errors: [],
        },
      },
    });
  }

  handleSubmit() {
    this.setState({ loading: true, errorsMsgs: [] });
    createTransaction(this.state.model)
      .then(response => {
        if (response.success) {
          this.props.history.push(`/transactions`);
        } else {
          this.setState({ model: response.model, loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false, errorsMsgs: [error.message] });
      });
  }

  render() {
    return (
      <Page
        title="Create Transaction"
        breadcrumbs={[
          { name: 'Transactions' },
          { name: 'Create', active: true },
        ]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <TransactionForm
                  model={this.state.model}
                  loading={this.state.loading}
                  handleChange={(name, event) => this.handleChange(name, event)}
                  handleSubmit={() => this.handleSubmit()}
                  successMsgs={[]}
                  errorsMsgs={this.state.errorsMsgs}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default CreateTransactionPage;
