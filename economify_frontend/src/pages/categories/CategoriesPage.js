import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import Page from 'components/Page';
import Loading from 'components/Loading';
import CategoriesTable from 'components/CategoriesTable';
import DataPagination from 'components/DataPagination';
import { getCategoriesPage, deleteCategory } from 'services/categoriesService';

class CategoriesPage extends React.Component {
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

  handleDelete(categoryId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.setState({ loading: true });
      deleteCategory(categoryId)
        .then(() => {
          this.loadPage(this.state.data.page_number);
        })
        .catch(err => {
          this.setState({ loading: false });
          alert(err.message);
        });
    }
  }

  render() {
    return (
      <Page
        title="Categories"
        breadcrumbs={[{ name: 'Categories', active: true }]}
      >
        <Row>
          <Col>
            <Button
              tag={Link}
              to="/categories/create"
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
              {this.state.loading ? (
                <CardBody>
                  <Loading />
                </CardBody>
              ) : (
                <CardBody>
                  <CategoriesTable
                    data={this.state.data.entries}
                    handleDelete={categoryId => this.handleDelete(categoryId)}
                  />
                  <DataPagination
                    data={this.state.data}
                    loadPage={page => this.loadPage(page)}
                  />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default CategoriesPage;
