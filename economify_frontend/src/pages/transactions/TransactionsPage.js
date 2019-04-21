import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import Page from 'components/Page';
import Loading from 'components/Loading';
import TransactionsTable from 'components/TransactionsTable';
import DataPagination from 'components/DataPagination';
import {
  getTransactionsPage,
  deleteTransaction,
} from 'services/transactionsService';

class TransactionsPage extends React.Component {
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

    getTransactionsPage(page).then(data =>
      this.setState({ data, loading: false }),
    );
  }

  handleDelete(transactionId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.setState({ loading: true });
      deleteTransaction(transactionId)
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
              {this.state.loading ? (
                <CardBody>
                  <Loading />
                </CardBody>
              ) : (
                <CardBody>
                  <TransactionsTable
                    data={this.state.data.entries}
                    handleDelete={transactionId =>
                      this.handleDelete(transactionId)
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

export default TransactionsPage;
