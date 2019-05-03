import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import IssuerForm from 'components/IssuerForm';
import { createIssuer } from 'services/issuersService';
import { parseModel } from 'utils/form';

class CreateIssuerPage extends React.Component {
  state = {
    model: parseModel({ name: '', description: '', alias: [] }),
    errorsMsgs: [],
    loading: false,
  };

  _goBackUrl = window.sessionStorage.getItem('ISSUERS_PAGE') || `/issuers`;

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
    createIssuer(this.state.model)
      .then(response => {
        if (response.success) {
          this.props.history.push(`/issuers/${response.model.issuer_id.value}`);
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
        title="Create Issuer"
        breadcrumbs={[{ name: 'Issuers' }, { name: 'Create', active: true }]}
        history={this.props.history}
        goBackUrl={this._goBackUrl}
      >
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <IssuerForm
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

export default CreateIssuerPage;
