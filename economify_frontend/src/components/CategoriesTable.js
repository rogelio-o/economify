import React from 'react';
import { getCategoriesPage } from 'services/categoriesService';
import DataTable from 'components/DataTable';

class CategoriesTable extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        dataField: 'name',
        text: 'Name',
      },
      {
        dataField: 'type',
        text: 'Type',
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
        keyField="category_id"
        page={this.props.page}
        setSetLoading={this.props.setSetLoading}
        setRefresh={this.props.setRefresh}
        loadData={getCategoriesPage}
        setPage={this.props.setPage}
        columns={this.columns}
      />
    );
  }
}

export default CategoriesTable;
