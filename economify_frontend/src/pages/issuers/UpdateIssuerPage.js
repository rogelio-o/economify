import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Page from 'components/Page';
import IssuerForm from 'components/IssuerForm';
import { getIssuer, updateIssuer } from 'services/issuersService';
import { parseModel } from 'utils/form';
import Loading from 'components/Loading';

class UpdateIssuerPage extends React.Component {
  state = {
    model: parseModel({ issuer_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingModel: true,
  };

  componentDidMount() {
    const issuerId = this.props.match.params.issuer_id;

    getIssuer(issuerId).then(values =>
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
    const issuerId = this.props.match.params.issuer_id;
    updateIssuer(issuerId, this.state.model)
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
        title="Update Issuer"
        breadcrumbs={[
          { name: 'Issuers' },
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
                  <IssuerForm
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

export default UpdateIssuerPage;
