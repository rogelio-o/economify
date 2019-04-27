import React from 'react';
import { getTransactionsPage } from 'services/transactionsService';
import DataTable from 'components/DataTable';
import {
  textFilter,
  dateFilter,
  Comparator,
} from 'react-bootstrap-table2-filter';

const getClassNameByAmount = amount => {
  if (amount === 0) {
    return 'text-secondary';
  } else if (amount > 0) {
    return 'text-success';
  } else {
    return 'text-danger';
  }
};

class TransactionsTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        dataField: 'concept',
        text: 'Concepts',
        filter: textFilter({
          defaultValue: props.filters.concept,
        }),
      },
      {
        dataField: 'date',
        text: 'Date',
        filter: dateFilter({
          defaultValue: {
            date: props.filters.date !== '' ? new Date(props.filters.date) : '',
            comparator: props.filters.date_comparator,
          },
          comparators: [Comparator.EQ],
          withoutEmptyComparatorOption: true,
        }),
        formatter: cell => {
          const date = new Date(cell);

          return date.toLocaleDateString('es-ES');
        },
      },
      {
        dataField: 'amount',
        text: 'Amount',
        formatter: cell => {
          return (
            <span className={getClassNameByAmount(cell)}>
              {Math.abs(cell).toFixed(2) + '€'}
            </span>
          );
        },
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
        keyField="transaction_id"
        page={this.props.page}
        setSetLoading={this.props.setSetLoading}
        setRefresh={this.props.setRefresh}
        loadData={getTransactionsPage}
        setTableData={this.props.setTableData}
        columns={this.columns}
      />
    );
  }
}

export default TransactionsTable;
