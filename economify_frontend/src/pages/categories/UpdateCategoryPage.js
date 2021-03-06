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
import { getQueryParam } from 'utils/query';

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

  handleDeleteRule(categoryRuleId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const categoryId = this.props.match.params.category_id;
      this._setLoading(true);
      deleteCategoryRule(categoryId, categoryRuleId)
        .then(() => {
          this._refresh();
        })
        .catch(err => {
          this._setLoading(false);
          alert(err.message);
        });
    }
  }

  renderRulesButtons(row) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button
          tag={Link}
          to={{
            pathname: `/categories/${row.category_id}/rules/${
              row.category_rule_id
            }`,
            state: {
              rulesGoBackUrl: this.getRulesGoBackUrl(),
              goBackUrl: this.getGoBackUrl(),
            },
          }}
          color="info"
        >
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e => this.handleDeleteRule(row.category_rule_id)}
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
  }

  setTableData({ page }) {
    const categoryId = this.props.match.params.category_id;
    this.props.history.push(`/categories/${categoryId}?rules_page=${page}`);
  }

  getGoBackUrl() {
    return (this.props.location.state || {}).goBackUrl;
  }

  getRulesGoBackUrl() {
    return this.props.location.pathname + this.props.location.search;
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
        history={this.props.history}
        goBackUrl={this.getGoBackUrl()}
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
              to={{
                pathname: `/categories/${categoryId}/rules/create`,
                state: {
                  rulesGoBackUrl: this.getRulesGoBackUrl(),
                  goBackUrl: this.getGoBackUrl(),
                },
              }}
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
                  page={
                    getQueryParam(this.props.location.search, 'rules_page') || 1
                  }
                  setTableData={this.setTableData.bind(this)}
                  setSetLoading={setLoading => (this._setLoading = setLoading)}
                  setRefresh={refresh => (this._refresh = refresh)}
                  renderButtons={row => this.renderRulesButtons(row)}
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
