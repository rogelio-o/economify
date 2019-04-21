import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import Page from 'components/Page';
import CategoryForm from 'components/CategoryForm';
import CategoriesRulesTable from 'components/CategoriesRulesTable';
import DataPagination from 'components/DataPagination';
import { getCategory, updateCategory } from 'services/categoriesService';
import { parseModel } from 'utils/form';
import Loading from 'components/Loading';
import {
  getCategoriesRulesPage,
  deleteCategoryRule,
} from 'services/categoriesRulesService';

class UpdateCategoryPage extends React.Component {
  state = {
    model: parseModel({ category_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingModel: true,
    loadingRules: true,
    rulesData: {
      entries: [],
    },
  };

  componentDidMount() {
    const categoryId = this.props.match.params.category_id;

    getCategory(categoryId).then(values =>
      this.setState({ loadingModel: false, model: parseModel(values) }),
    );

    this.loadRulePage(1);
  }

  handleChange(name, event) {
    this.setState({
      model: {
        ...this.state.model,
        [name]: {
          value: event.target.value,
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

  loadRulePage(page) {
    const categoryId = this.props.match.params.category_id;
    this.setState({ loadingRules: true });

    getCategoriesRulesPage(categoryId, page).then(rulesData =>
      this.setState({ rulesData, loadingRules: false }),
    );
  }

  handleDeleteRule(categoryRuleId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const categoryId = this.props.match.params.category_id;
      this.setState({ loadingRules: true });
      deleteCategoryRule(categoryId, categoryRuleId)
        .then(() => {
          this.loadRulePage(this.state.rulesData.page_number);
        })
        .catch(err => {
          this.setState({ loadingRules: false });
          alert(err.message);
        });
    }
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
                {this.state.loadingRules ? (
                  <Loading />
                ) : (
                  <div>
                    <CategoriesRulesTable
                      data={this.state.rulesData.entries}
                      handleDelete={ruleId => this.handleDeleteRule(ruleId)}
                    />
                    <DataPagination
                      data={this.state.rulesData}
                      loadPage={page => this.loadRulePage(page)}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default UpdateCategoryPage;
