import React from 'react';
import { getIssuersPage } from 'services/issuersService';
import DataTable from 'components/DataTable';
import { textFilter } from 'react-bootstrap-table2-filter';

class IssuersTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        dataField: 'name',
        text: 'Name',
        filter: textFilter(),
      },
      {
        dataField: 'description',
        text: 'Description',
      },
      {
        dataField: 'button',
        text: '',
        formatter: this.renderButtons.bind(this),
        headerStyle: (colum, colIndex) => {
          return { width: '120px' };
        },
      },
    ];
  }

  renderButtons(cell, row) {
    return this.props.renderButtons(row);
  }

  render() {
    return (
      <DataTable
        keyField="issuer_id"
        page={this.props.page}
        setSetLoading={this.props.setSetLoading}
        setRefresh={this.props.setRefresh}
        loadData={getIssuersPage}
        setPage={this.props.setPage}
        columns={this.columns}
      />
    );
  }
}

export default IssuersTable;
