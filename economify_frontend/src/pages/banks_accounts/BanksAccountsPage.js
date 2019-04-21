import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import Page from 'components/Page';
import Loading from 'components/Loading';
import BanksAccountsTable from 'components/BanksAccountsTable';
import DataPagination from 'components/DataPagination';
import {
  getBanksAccountsPage,
  deleteBankAccount,
} from 'services/banksAccountsService';

class BanksAccountsPage extends React.Component {
  state = {
    loading: true,
    data: {
      entries: [],
    },
  };

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage(page) {
    this.setState({ loading: true });

    getBanksAccountsPage(page).then(data =>
      this.setState({ data, loading: false }),
    );
  }

  handleDelete(bankAccountId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.setState({ loading: true });
      deleteBankAccount(bankAccountId)
        .then(() => {
          this.loadPage(this.state.data.page_number);
        })
        .catch(err => {
          this.setState({ loading: false });
          alert(err.message);
        });
    }
  }

  render() {
    return (
      <Page
        title="Bank Accounts"
        breadcrumbs={[{ name: 'Bank Accounts', active: true }]}
      >
        <Row>
          <Col>
            <Button
              tag={Link}
              to="/banks/accounts/create"
              color="success"
              className="float-right"
            >
              <MdAdd />
              New bank account
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              {this.state.loading ? (
                <CardBody>
                  <Loading />
                </CardBody>
              ) : (
                <CardBody>
                  <BanksAccountsTable
                    data={this.state.data.entries}
                    handleDelete={bankAccountId =>
                      this.handleDelete(bankAccountId)
                    }
                  />
                  <DataPagination
                    data={this.state.data}
                    loadPage={page => this.loadPage(page)}
                  />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default BanksAccountsPage;
