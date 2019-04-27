import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import BanksAccountsTable from 'components/BanksAccountsTable';
import { deleteBankAccount } from 'services/banksAccountsService';
import { getQueryParam } from 'utils/query';

class BanksAccountsPage extends React.Component {
  handleDelete(bankAccountId, setLoading, refresh) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this._setLoading(true);
      deleteBankAccount(bankAccountId)
        .then(() => {
          this._refresh();
        })
        .catch(err => {
          this._setLoading(false);
          alert(err.message);
        });
    }
  }

  setPage(num) {
    this.props.history.push(`/banks/accounts?page=${num}`);
  }

  renderButtons(row) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button
          tag={Link}
          to={`/banks/accounts/${row.bank_account_id}`}
          color="info"
        >
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e => this.handleDelete(row.bank_account_id)}
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
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
              <CardBody>
                <BanksAccountsTable
                  page={getQueryParam(this.props.location.search, 'page') || 1}
                  setPage={num => this.setPage(num)}
                  setSetLoading={setLoading => (this._setLoading = setLoading)}
                  setRefresh={refresh => (this._refresh = refresh)}
                  renderButtons={row => this.renderButtons(row)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default BanksAccountsPage;
