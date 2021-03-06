import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import CategoriesTable from 'components/CategoriesTable';
import { deleteCategory } from 'services/categoriesService';
import { getQueryParam } from 'utils/query';

class CategoriesPage extends React.Component {
  handleDelete(categoryId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this._setLoading(true);
      deleteCategory(categoryId)
        .then(() => {
          this._refresh();
        })
        .catch(err => {
          this._setLoading(false);
          alert(err.message);
        });
    }
  }

  setTableData({ page }) {
    this.props.history.push(`/categories?page=${page}`);
  }

  renderButtons(row) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button
          tag={Link}
          to={{
            pathname: `/categories/${row.category_id}`,
            state: { goBackUrl: this.getGoBackUrl() },
          }}
          color="info"
        >
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e => this.handleDelete(row.category_id)}
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
  }

  getGoBackUrl() {
    return this.props.location.pathname + this.props.location.search;
  }

  render() {
    return (
      <Page
        title="Categories"
        breadcrumbs={[{ name: 'Categories', active: true }]}
        history={this.props.history}
      >
        <Row>
          <Col>
            <Button
              tag={Link}
              to={{
                pathname: '/categories/create',
                state: { goBackUrl: this.getGoBackUrl() },
              }}
              color="success"
              className="float-right"
            >
              <MdAdd />
              New category
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <CategoriesTable
                  page={getQueryParam(this.props.location.search, 'page') || 1}
                  setTableData={this.setTableData.bind(this)}
                  setSetLoading={setLoading => (this._setLoading = setLoading)}
                  setRefresh={refresh => (this._refresh = refresh)}
                  renderButtons={row => this.renderButtons(row)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default CategoriesPage;
