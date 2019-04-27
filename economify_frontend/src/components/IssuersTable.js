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
        filter: textFilter({ defaultValue: props.filters.name }),
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
        filters={this.props.filters}
        setSetLoading={this.props.setSetLoading}
        setRefresh={this.props.setRefresh}
        loadData={getIssuersPage}
        setTableData={this.props.setTableData}
        columns={this.columns}
      />
    );
  }
}

export default IssuersTable;
