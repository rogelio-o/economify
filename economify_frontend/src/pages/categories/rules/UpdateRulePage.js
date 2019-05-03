import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import CategoryRuleForm from 'components/CategoryRuleForm';
import CategoryRuleParamsForm from 'components/CategoryRuleParamsForm';
import {
  getCategoryRule,
  updateCategoryRule,
} from 'services/categoriesRulesService';
import { parseModel } from 'utils/form';
import Loading from 'components/Loading';

class UpdateRulePage extends React.Component {
  state = {
    model: parseModel({ category_rule_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingModel: true,
  };

  componentDidMount() {
    const categoryId = this.props.match.params.category_id;
    const categoryRuleId = this.props.match.params.category_rule_id;

    getCategoryRule(categoryId, categoryRuleId).then(values =>
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
    this.setState({ loading: true, errorsMsgs: [], successMsgs: [] });
    const categoryId = this.props.match.params.category_id;
    const categoryRuleId = this.props.match.params.category_rule_id;
    updateCategoryRule(categoryId, categoryRuleId, this.state.model)
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

  render() {
    const categoryId = this.props.match.params.category_id;

    return (
      <Page
        title="Update Rule"
        breadcrumbs={[
          { name: 'Categories' },
          { name: 'Rules' },
          {
            name: 'Update',
            active: true,
          },
        ]}
        history={this.props.history}
        goBackUrl={`/categories/${categoryId}`}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                {this.state.loadingModel ? (
                  <Loading />
                ) : (
                  <CategoryRuleForm
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
          {this.state.loadingModel ? null : (
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
          )}
        </Row>
      </Page>
    );
  }
}

export default UpdateRulePage;
