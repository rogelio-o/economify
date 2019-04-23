import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import TransactionsTable from 'components/TransactionsTable';
import {
  createTransactions,
  deleteTransaction,
} from 'services/transactionsService';
import { parseModel } from 'utils/form';

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

  handleImportClick() {
    this.fileInput.click();
  }

  csvToJson(csv) {
    const lines = csv.split('\n');

    return lines.map(line => {
      const currentline = line.split(',');
      return {
        concept: currentline[0],
        date: currentline[1],
        amount: parseFloat(currentline[2]),
        issuer: currentline[3],
        bank_id: currentline[4],
      };
    });
  }

  handleImportFileContent(fileReader) {
    const content = fileReader.result;
    const transactions = this.csvToJson(content);

    createTransactions(transactions.map(parseModel));
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
