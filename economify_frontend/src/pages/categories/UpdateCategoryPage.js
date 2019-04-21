import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import CategoryForm from 'components/CategoryForm';
import CategoriesRulesTable from 'components/CategoriesRulesTable';
import { getCategory, updateCategory } from 'services/categoriesService';
import { parseModel } from 'utils/form';
import { deleteCategoryRule } from 'services/categoriesRulesService';
import Loading from 'components/Loading';

class UpdateCategoryPage extends React.Component {
  state = {
    model: parseModel({ category_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingModel: true,
  };

  componentDidMount() {
    const categoryId = this.props.match.params.category_id;

    getCategory(categoryId).then(values =>
      this.setState({ loadingModel: false, model: parseModel(values) }),
    );
  }

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
    this.setState({ loading: true, errorsMsgs: [], successMsgs: [] });
    const categoryId = this.props.match.params.category_id;
    updateCategory(categoryId, this.state.model)
      .then(response => {
        const successMsgs = [];
        if (response.success) {
          successMsgs.push('Updated successfully.');
        }

        this.setState({ model: response.model, loading: false, successMsgs });
      })
      .catch(error => {
        this.setState({ loading: false, errorsMsgs: [error.message] });
      });
  }

  handleDeleteRule(categoryRuleId, setLoading, refresh) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const categoryId = this.props.match.params.category_id;
      setLoading(true);
      deleteCategoryRule(categoryId, categoryRuleId)
        .then(() => {
          refresh();
        })
        .catch(err => {
          setLoading(false);
          alert(err.message);
        });
    }
  }

  renderRulesButtons(row, setLoading, refresh) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button
          tag={Link}
          to={`/categories/${row.category_id}/rules/${row.category_rule_id}`}
          color="info"
        >
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e =>
            this.handleDeleteRule(row.category_rule_id, setLoading, refresh)
          }
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
  }

  render() {
    const categoryId = this.props.match.params.category_id;

    return (
      <Page
        title="Update Category"
        breadcrumbs={[
          { name: 'Categories' },
          {
            name: 'Update',
            active: true,
          },
        ]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                {this.state.loadingModel ? (
                  <Loading />
                ) : (
                  <CategoryForm
                    model={this.state.model}
                    loading={this.state.loading}
                    handleChange={(name, event) =>
                      this.handleChange(name, event)
                    }
                    handleSubmit={() => this.handleSubmit()}
                    successMsgs={this.state.successMsgs}
                    errorsMsgs={this.state.errorsMsgs}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              tag={Link}
              to={`/categories/${categoryId}/rules/create`}
              color="success"
              className="float-right"
            >
              <MdAdd />
              New rule
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>Rules</CardHeader>
              <CardBody>
                <CategoriesRulesTable
                  categoryId={categoryId}
                  renderButtons={(row, setLoading, refresh) =>
                    this.renderRulesButtons(row, setLoading, refresh)
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

export default UpdateCategoryPage;
