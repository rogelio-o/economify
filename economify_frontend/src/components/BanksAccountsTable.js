import React from 'react';
import { getBanksAccountsPage } from 'services/banksAccountsService';
import DataTable from 'components/DataTable';

class BanksAccountsTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        dataField: 'name',
        text: 'Name',
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
        keyField="bank_account_id"
        page={this.props.page}
        setSetLoading={this.props.setSetLoading}
        setRefresh={this.props.setRefresh}
        loadData={getBanksAccountsPage}
        setPage={this.props.setPage}
        columns={this.columns}
      />
    );
  }
}

export default BanksAccountsTable;
