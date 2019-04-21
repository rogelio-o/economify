import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import BanksAccountsTable from 'components/BanksAccountsTable';
import { deleteBankAccount } from 'services/banksAccountsService';

class BanksAccountsPage extends React.Component {
  handleDelete(bankAccountId, setLoading, refresh) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setLoading(true);
      deleteBankAccount(bankAccountId)
        .then(() => {
          refresh();
        })
        .catch(err => {
          setLoading(false);
          alert(err.message);
        });
    }
  }

  renderButtons(row, setLoading, refresh) {
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
          onClick={e =>
            this.handleDelete(row.bank_account_id, setLoading, refresh)
          }
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
                  renderButtons={(row, setLoading, refresh) =>
                    this.renderButtons(row, setLoading, refresh)
                  }
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
