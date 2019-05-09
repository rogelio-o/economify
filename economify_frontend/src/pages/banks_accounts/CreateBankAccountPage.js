import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import BankAccountForm from 'components/BankAccountForm';
import { createBankAccount } from 'services/banksAccountsService';
import { parseModel } from 'utils/form';

class CreateBankAccountPage extends React.Component {
  state = {
    model: parseModel({ name: '', description: '' }),
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
    createBankAccount(this.state.model)
      .then(response => {
        if (response.success) {
          this.props.history.push(
            `/banks/accounts/${response.model.bank_account_id.value}`,
          );
        } else {
          this.setState({ model: response.model, loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false, errorsMsgs: [error.message] });
      });
  }

  getGoBackUrl() {
    return (this.props.location.state || {}).goBackUrl;
  }

  render() {
    return (
      <Page
        title="Create Bank Account"
        breadcrumbs={[
          { name: 'Banks Accounts' },
          { name: 'Create', active: true },
        ]}
        history={this.props.history}
        goBackUrl={this.getGoBackUrl()}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <BankAccountForm
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

export default CreateBankAccountPage;
