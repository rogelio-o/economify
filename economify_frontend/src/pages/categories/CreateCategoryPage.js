import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import CategoryForm from 'components/CategoryForm';
import { createCategory } from 'services/categoriesService';
import { parseModel } from 'utils/form';

class CreateCategoryPage extends React.Component {
  state = {
    model: parseModel({ name: '', description: '', type: 'expense' }),
    errorsMsgs: [],
    loading: false,
  };

  handleChange(name, value) {
    this.setState({
      model: {
        ...this.state.model,
        [name]: {
          value: value,
          errors: [],
        },
      },
    });
  }

  handleSubmit() {
    this.setState({ loading: true, errorsMsgs: [] });
    createCategory(this.state.model)
      .then(response => {
        if (response.success) {
          this.props.history.push(
            `/categories/${response.model.category_id.value}`,
          );
        } else {
          this.setState({ model: response.model, loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false, errorsMsgs: [error.message] });
      });
  }

  render() {
    return (
      <Page
        title="Create Category"
        breadcrumbs={[{ name: 'Categories' }, { name: 'Create', active: true }]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <CategoryForm
                  model={this.state.model}
                  loading={this.state.loading}
                  handleChange={(name, event) => this.handleChange(name, event)}
                  handleSubmit={() => this.handleSubmit()}
                  successMsgs={[]}
                  errorsMsgs={this.state.errorsMsgs}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default CreateCategoryPage;
