import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete, MdRefresh } from 'react-icons/md';
import Papa from 'papaparse';
import Page from 'components/Page';
import TransactionsTable from 'components/TransactionsTable';
import {
  createTransactions,
  deleteTransaction,
  recategorizeTransactions,
} from 'services/transactionsService';
import { parseModel } from 'utils/form';
import { getQueryParam, stringifyQuery } from 'utils/query';

class TransactionsPage extends React.Component {
  _refresh = null;
  _setLoading = null;

  constructor(props) {
    super(props);

    window.sessionStorage.setItem(
      'TRANSACTIONS_PAGE',
      props.location.pathname + props.location.search,
    );
  }

  componentDidUpdate() {
    window.sessionStorage.setItem(
      'TRANSACTIONS_PAGE',
      this.props.location.pathname + this.props.location.search,
    );
  }

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

  setTableData({ page, filters }) {
    const filtersQuery = stringifyQuery(filters);
    const url = `/transactions?page=${page}&${filtersQuery}`;

    window.sessionStorage.setItem('TRANSACTIONS_PAGE', url);
    this.props.history.push(url);
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

  handleRecategorizeClick() {
    recategorizeTransactions()
      .then(() => {
        this._refresh();
        alert('Recategorized successfully.');
      })
      .catch(() => alert('Error recategorizing.'));
  }

  render() {
    return (
      <Page
        title="Transactions"
        breadcrumbs={[{ name: 'Transactions', active: true }]}
        history={this.props.history}
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

              <Button
                color="danger"
                onClick={() => this.handleRecategorizeClick()}
              >
                <MdRefresh />
                Recategorize
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
                  filters={{
                    concept:
                      getQueryParam(this.props.location.search, 'concept') ||
                      '',
                    date:
                      getQueryParam(this.props.location.search, 'date') || null,
                  }}
                  setTableData={this.setTableData.bind(this)}
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
