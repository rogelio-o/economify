import React from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import Page from 'components/Page';
import IssuerForm from 'components/IssuerForm';
import IssuerMergeForm from 'components/IssuerMergeForm';
import { getIssuer, updateIssuer, mergeIssuers } from 'services/issuersService';
import { parseModel } from 'utils/form';
import Loading from 'components/Loading';
import Typography from 'components/Typography';

class UpdateIssuerPage extends React.Component {
  state = {
    model: parseModel({ issuer_id: '' }),
    mergeModel: parseModel({ other_issuer_id: '' }),
    successMsgs: [],
    errorsMsgs: [],
    loading: false,
    loadingMerge: false,
    loadingModel: true,
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.issuer_id !== this.props.match.params.issuer_id
    ) {
      this.load();
    }
  }

  load() {
    this.setState({
      model: parseModel({ issuer_id: '' }),
      mergeModel: parseModel({ other_issuer_id: '' }),
      successMsgs: [],
      errorsMsgs: [],
      loading: false,
      loadingMerge: false,
      loadingModel: true,
    });

    const issuerId = this.props.match.params.issuer_id;

    getIssuer(issuerId).then(values =>
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

  handleMergeChange(name, value) {
    this.setState({
      mergeModel: {
        ...this.state.mergeModel,
        [name]: {
          value: value,
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

  handleMergeSubmit() {
    if (
      window.confirm(
        'Are you sure you want to merge the issuers? This issuer will be deleted and all the transactions of the issuer will be updated with the other issuer.',
      )
    ) {
      mergeIssuers(
        this.state.mergeModel.other_issuer_id.value,
        this.props.match.params.issuer_id,
      ).then(response => {
        if (response.success) {
          this.props.history.push({
            pathname: `/issuers/${response.model.issuer_id.value}`,
            state: {
              goBackUrl: this.getGoBackUrl(),
            },
          });
        }
      });
    }
  }

  getGoBackUrl() {
    return (this.props.location.state || {}).goBackUrl;
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
          <Col md="4">
            <Card>
              <CardHeader>Merge with</CardHeader>
              <CardBody>
                <Typography>
                  The issuer will be merge IN the selected issuer. This issuer
                  will dissapear.
                </Typography>

                <IssuerMergeForm
                  model={this.state.mergeModel}
                  loading={this.state.loadingMerge}
                  handleChange={(name, event) =>
                    this.handleMergeChange(name, event)
                  }
                  handleSubmit={() => this.handleMergeSubmit()}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default UpdateIssuerPage;
