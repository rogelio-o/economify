import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import CategoryRuleForm from 'components/CategoryRuleForm';
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
        </Row>
      </Page>
    );
  }
}

export default UpdateRulePage;
