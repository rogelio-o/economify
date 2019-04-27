import React from 'react';
import { getCategoriesRulesPage } from 'services/categoriesRulesService';
import DataTable from 'components/DataTable';

class CategoriesRulesTable extends React.Component {
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
        dataField: 'priority',
        text: 'Priority',
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
        keyField="category_rule_id"
        page={this.props.page}
        setSetLoading={this.props.setSetLoading}
        setRefresh={this.props.setRefresh}
        loadData={page => getCategoriesRulesPage(this.props.categoryId, page)}
        setTableData={this.props.setTableData}
        columns={this.columns}
      />
    );
  }
}

export default CategoriesRulesTable;
