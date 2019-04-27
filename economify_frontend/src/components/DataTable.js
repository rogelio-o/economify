import React from 'react';
import Loading from 'components/Loading';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';

const formatFilters = filters => {
  const result = {};
  for (let key of Object.keys(filters)) {
    result[key] = filters[key].filterVal;
  }

  return result;
};

class DataTable extends React.Component {
  state = {
    loading: true,
    data: {
      page_number: 1,
      page_size: 5,
      total_pages: 1,
      entries: [],
    },
  };

  constructor(props) {
    super(props);

    this._filters = {};
  }

  componentDidMount() {
    this.loadPage(this.props.page, this._filters);

    if (this.props.setSetLoading) {
      this.props.setSetLoading(this.setLoading.bind(this));
    }

    if (this.props.setRefresh) {
      this.props.setRefresh(this.refresh.bind(this));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page) {
      this.loadPage(this.props.page, this._filters);
    }
  }

  loadPage(page, filters) {
    this.setState({ loading: true });

    this.props
      .loadData(page, filters)
      .then(data => this.setState({ data, loading: false }));
  }

  setPage(num) {
    this.props.setPage(num);
  }

  refresh() {
    this.loadPage(this.state.data.page_number, this._filters);
  }

  setLoading(loading) {
    this.setState({ loading });
  }

  handleTableChange = (type, { page, filters }) => {
    if (type === 'filter') {
      this._filters = formatFilters(filters);

      this.loadPage(this.state.data.page_number, this._filters);
    } else if (type === 'pagination') {
      this.setPage(page);
    }
  };

  render() {
    const data = this.state.data;

    return (
      <div>
        {this.state.loading ? <Loading /> : null}
        <BootstrapTable
          data={data.entries}
          remote
          keyField={this.props.keyField}
          columns={this.props.columns}
          onTableChange={this.handleTableChange.bind(this)}
          pagination={paginationFactory({
            hideSizePerPage: true,
            page: data.page_number,
            sizePerPage: data.page_size,
            totalSize: data.total_entries,
            showTotal: true,
          })}
          filter={filterFactory()}
        />
      </div>
    );
  }
}

export default DataTable;
