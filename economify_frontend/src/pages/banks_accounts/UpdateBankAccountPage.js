import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import BankAccountForm from 'components/BankAccountForm';
import {
  getBankAccount,
  updateBankAccount,
} from 'services/banksAccountsService';
import { parseModel } from 'utils/form';
import Loading from 'components/Loading';

class UpdateBankAccountPage extends React.Component {
  state = {
    model: parseModel({ bank_account_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingModel: true,
  };

  componentDidMount() {
    const bankAccountId = this.props.match.params.bank_account_id;

    getBankAccount(bankAccountId).then(values =>
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
    const bankAccountId = this.props.match.params.bank_account_id;
    updateBankAccount(bankAccountId, this.state.model)
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
        title="Update Bank Account"
        breadcrumbs={[
          { name: 'Banks Accounts' },
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
                  <BankAccountForm
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

export default UpdateBankAccountPage;
