import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Papa from 'papaparse';
import Page from 'components/Page';
import TransactionsTable from 'components/TransactionsTable';
import {
  createTransactions,
  deleteTransaction,
} from 'services/transactionsService';
import { parseModel } from 'utils/form';
import { getQueryParam } from 'utils/query';

class TransactionsPage extends React.Component {
  _refresh = null;
  _setLoading = null;

  handleDelete(transactionId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this._setLoading(true);
      deleteTransaction(transactionId)
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
    this.props.history.push(`/transactions?page=${num}`);
  }

  renderButtons(row) {
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
          onClick={e => this.handleDelete(row.transaction_id)}
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
  }

  handleImportClick() {
    this.fileInput.click();
  }

  csvToJson(csv) {
    const result = Papa.parse(csv);

    return result.data.map(line => {
      return {
        concept: line[0],
        date: line[1],
        amount: line[2],
        issuer: line[3],
        bank_id: line[4],
      };
    });
  }

  handleImportFileContent(fileReader) {
    const content = fileReader.result;
    const transactions = this.csvToJson(content);

    createTransactions(transactions.map(parseModel))
      .then(results => {
        const errors = results.filter(r => !r.success);
        if (errors.length > 0) {
          console.log(errors);
          alert(`${errors.length} transactions not added.`);
        }
        this._refresh();
      })
      .catch(error => {
        alert(error.message);
      });
  }

  handleImportFile(file) {
    const fileReader = new FileReader();
    fileReader.onloadend = e => this.handleImportFileContent(fileReader);
    fileReader.readAsText(file);
  }

  render() {
    return (
      <Page
        title="Transactions"
        breadcrumbs={[{ name: 'Transactions', active: true }]}
      >
        <Row>
          <Col>
            <ButtonGroup className="float-right">
              <Button tag={Link} to="/transactions/create" color="success">
                <MdAdd />
                New transaction
              </Button>

              <Button color="primary" onClick={() => this.handleImportClick()}>
                <MdAdd />
                Import transactions
              </Button>
            </ButtonGroup>
            <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              ref={input => (this.fileInput = input)}
              onChange={e => this.handleImportFile(e.target.files[0])}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <TransactionsTable
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

export default TransactionsPage;
