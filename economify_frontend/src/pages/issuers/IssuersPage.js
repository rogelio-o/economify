import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import Page from 'components/Page';
import Loading from 'components/Loading';
import IssuersTable from 'components/IssuersTable';
import DataPagination from 'components/DataPagination';
import { getIssuersPage, deleteIssuer } from 'services/issuersService';

class IssuersPage extends React.Component {
  state = {
    loading: true,
    data: {
      entries: [],
    },
  };

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage(page) {
    this.setState({ loading: true });

    getIssuersPage(page).then(data => this.setState({ data, loading: false }));
  }

  handleDelete(issuerId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this.setState({ loading: true });
      deleteIssuer(issuerId)
        .then(() => {
          this.loadPage(this.state.data.page_number);
        })
        .catch(err => {
          this.setState({ loading: false });
          alert(err.message);
        });
    }
  }

  render() {
    return (
      <Page title="Issuers" breadcrumbs={[{ name: 'Issuers', active: true }]}>
        <Row>
          <Col>
            <Button
              tag={Link}
              to="/issuers/create"
              color="success"
              className="float-right"
            >
              <MdAdd />
              New issuer
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mb-3">
              {this.state.loading ? (
                <CardBody>
                  <Loading />
                </CardBody>
              ) : (
                <CardBody>
                  <IssuersTable
                    data={this.state.data.entries}
                    handleDelete={issuerId => this.handleDelete(issuerId)}
                  />
                  <DataPagination
                    data={this.state.data}
                    loadPage={page => this.loadPage(page)}
                  />
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default IssuersPage;
