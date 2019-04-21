import React from 'react';
import { Table } from 'reactstrap';
import { getIssuersPage } from 'services/issuersService';
import Loading from 'components/Loading';
import DataPagination from 'components/DataPagination';

class IssuersTable extends React.Component {
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

    getIssuersPage(page).then(data => this.setState({ data, loading: false }));
  }

  refresh() {
    this.loadPage(this.state.data.page_number);
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  renderButtons(row) {
    return this.props.renderButtons(
      row,
      loading => this.setLoading(loading),
      () => this.refresh(),
    );
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
                <th>Name</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.data.entries.map(row => (
                <tr key={`row-${row.issuer_id}`}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
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

export default IssuersTable;
