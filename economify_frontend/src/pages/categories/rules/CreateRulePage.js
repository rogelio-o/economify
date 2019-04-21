import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import CategoryRuleForm from 'components/CategoryRuleForm';
import { createCategoryRule } from 'services/categoriesRulesService';
import { parseModel } from 'utils/form';

class CreateRulePage extends React.Component {
  state = {
    model: parseModel({ name: '', description: '', priority: 1 }),
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
    const categoryId = this.props.match.params.category_id;

    this.setState({ loading: true, errorsMsgs: [] });
    createCategoryRule(categoryId, this.state.model)
      .then(response => {
        if (response.success) {
          this.props.history.push(
            `/categories/${categoryId}/rules/${
              response.model.category_rule_id.value
            }`,
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
        title="Create Rule"
        breadcrumbs={[
          { name: 'Categories' },
          { name: 'Rules' },
          { name: 'Create', active: true },
        ]}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <CategoryRuleForm
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

export default CreateRulePage;
