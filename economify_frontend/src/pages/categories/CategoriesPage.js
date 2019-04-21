import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import CategoriesTable from 'components/CategoriesTable';
import { deleteCategory } from 'services/categoriesService';

class CategoriesPage extends React.Component {
  handleDelete(categoryId, setLoading, refresh) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setLoading(true);
      deleteCategory(categoryId)
        .then(() => {
          refresh();
        })
        .catch(err => {
          setLoading(false);
          alert(err.message);
        });
    }
  }

  renderButtons(row, setLoading, refresh) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button tag={Link} to={`/categories/${row.category_id}`} color="info">
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e => this.handleDelete(row.category_id, setLoading, refresh)}
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
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
              <CardBody>
                <CategoriesTable
                  renderButtons={(row, setLoading, refresh) =>
                    this.renderButtons(row, setLoading, refresh)
                  }
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
