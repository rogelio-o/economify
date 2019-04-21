import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import TransactionsTable from 'components/TransactionsTable';
import { deleteTransaction } from 'services/transactionsService';

class TransactionsPage extends React.Component {
  handleDelete(transactionId, setLoading, refresh) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setLoading(true);
      deleteTransaction(transactionId)
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
          to={`/transactions/${row.transaction_id}`}
          color="info"
        >
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e =>
            this.handleDelete(row.transaction_id, setLoading, refresh)
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
        title="Transactions"
        breadcrumbs={[{ name: 'Transactions', active: true }]}
      >
        <Row>
          <Col>
            <Button
              tag={Link}
              to="/transactions/create"
              color="success"
              className="float-right"
            >
              <MdAdd />
              New transaction
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <TransactionsTable
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

export default TransactionsPage;
