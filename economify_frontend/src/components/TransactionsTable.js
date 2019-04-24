import React from 'react';
import { Table } from 'reactstrap';
import { getTransactionsPage } from 'services/transactionsService';
import DataPagination from 'components/DataPagination';
import Loading from 'components/Loading';

class TransactionsTable extends React.Component {
  state = {
    loading: true,
    data: {
      entries: [],
    },
  };

  componentDidMount() {
    this.loadPage(1);

    this.props.setRefresh(() => this.refresh());
    this.props.setSetLoading(loading => this.setLoading(loading));
  }

  loadPage(page) {
    this.setState({ loading: true });

    getTransactionsPage(page).then(data =>
      this.setState({ data, loading: false }),
    );
  }

  refresh() {
    this.loadPage(this.state.data.page_number);
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  renderButtons(row) {
    return this.props.renderButtons(row);
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Concept</th>
                <th>Date</th>
                <th>Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.data.entries.map(row => (
                <tr key={`row-${row.transaction_id}`}>
                  <td>{row.concept}</td>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                  <td>{this.renderButtons(row)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <DataPagination
            data={this.state.data}
            loadPage={page => this.loadPage(page)}
          />
        </div>
      );
    }
  }
}

export default TransactionsTable;
