import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import TransactionForm from 'components/TransactionForm';
import {
  getTransaction,
  updateTransaction,
} from 'services/transactionsService';
import { parseModel } from 'utils/form';
import Loading from 'components/Loading';

class UpdateTransactionPage extends React.Component {
  state = {
    model: parseModel({ transaction_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingModel: true,
  };

  componentDidMount() {
    const transactionId = this.props.match.params.transaction_id;

    getTransaction(transactionId).then(values =>
      this.setState({ loadingModel: false, model: parseModel(values) }),
    );
  }

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
    this.setState({ loading: true, errorsMsgs: [], successMsgs: [] });
    const transactionId = this.props.match.params.transaction_id;
    updateTransaction(transactionId, this.state.model)
      .then(response => {
        const successMsgs = [];
        if (response.success) {
          successMsgs.push('Updated successfully.');
        }

        this.setState({ model: response.model, loading: false, successMsgs });
      })
      .catch(error => {
        this.setState({ loading: false, errorsMsgs: [error.message] });
      });
  }

  render() {
    return (
      <Page
        title="Update Transaction"
        breadcrumbs={[
          { name: 'Transactions' },
          {
            name: 'Update',
            active: true,
          },
        ]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                {this.state.loadingModel ? (
                  <Loading />
                ) : (
                  <TransactionForm
                    model={this.state.model}
                    loading={this.state.loading}
                    handleChange={(name, event) =>
                      this.handleChange(name, event)
                    }
                    handleSubmit={() => this.handleSubmit()}
                    successMsgs={this.state.successMsgs}
                    errorsMsgs={this.state.errorsMsgs}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default UpdateTransactionPage;
