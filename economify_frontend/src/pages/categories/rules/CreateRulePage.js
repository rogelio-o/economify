import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import CategoryRuleForm from 'components/CategoryRuleForm';
import { createCategoryRule } from 'services/categoriesRulesService';
import { parseModel } from 'utils/form';
import CategoryRuleParamsForm from 'components/CategoryRuleParamsForm';

class CreateRulePage extends React.Component {
  state = {
    model: parseModel({
      name: '',
      description: '',
      priority: 1,
      type: 'concept',
      params: {
        concept: '',
        issuer_id: '',
      },
    }),
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

  handleParamChange(name, value) {
    this.setState({
      model: {
        ...this.state.model,
        params: {
          ...this.state.model.params,
          [name]: {
            value: value,
            errors: [],
          },
        },
      },
    });
  }

  handleSubmit() {
    const categoryId = this.props.match.params.category_id;

    this.setState({ loading: true, errorsMsgs: [] });
    createCategoryRule(categoryId, this.state.model)
      .then(response => {
        if (response.success) {
          this.props.history.push({
            pathname: `/categories/${categoryId}/rules/${
              response.model.category_rule_id.value
            }`,
            state: {
              rulesGoBackUrl: this.getRulesGoBackUrl(),
              goBackUrl: this.getGoBackUrl(),
            },
          });
        } else {
          this.setState({ model: response.model, loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false, errorsMsgs: [error.message] });
      });
  }

  getGoBackUrl() {
    return (this.props.location.state || {}).goBackUrl;
  }

  getRulesGoBackUrl() {
    return (this.props.location.state || {}).rulesGoBackUrl;
  }

  render() {
    return (
      <Page
        title="Create Rule"
        breadcrumbs={[
          { name: 'Categories' },
          { name: 'Rules' },
          { name: 'Create', active: true },
        ]}
        history={this.props.history}
        goBackUrl={{
          pathname: this.getRulesGoBackUrl(),
          state: { goBackUrl: this.getGoBackUrl() },
        }}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <CategoryRuleForm
                  model={this.state.model}
                  loading={this.state.loading}
                  handleChange={(name, value) => this.handleChange(name, value)}
                  handleSubmit={() => this.handleSubmit()}
                  successMsgs={[]}
                  errorsMsgs={this.state.errorsMsgs}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="5">
            <Card className="mb-3">
              <CardBody>
                <CategoryRuleParamsForm
                  model={this.state.model}
                  handleChange={(name, value) =>
                    this.handleParamChange(name, value)
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

export default CreateRulePage;
