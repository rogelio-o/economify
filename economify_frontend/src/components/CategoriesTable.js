import React from 'react';
import { Table } from 'reactstrap';
import Loading from 'components/Loading';
import { getCategoriesPage } from 'services/categoriesService';
import DataPagination from 'components/DataPagination';

class CategoriesTable extends React.Component {
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

    getCategoriesPage(page).then(data =>
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
                <th>Type</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.data.entries.map(row => (
                <tr key={`row-${row.category_id}`}>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
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

export default CategoriesTable;
