import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import IssuersTable from 'components/IssuersTable';
import { deleteIssuer } from 'services/issuersService';
import { getQueryParam, stringifyQuery } from 'utils/query';

class IssuersPage extends React.Component {
  handleDelete(issuerId) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      this._setLoading(true);
      deleteIssuer(issuerId)
        .then(() => {
          this._refresh();
        })
        .catch(err => {
          this._setLoading(false);
          alert(err.message);
        });
    }
  }

  renderButtons(row) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button
          tag={Link}
          to={{
            pathname: `/issuers/${row.issuer_id}`,
            state: { goBackUrl: this.getGoBackUrl() },
          }}
          color="info"
        >
          <MdModeEdit />
        </Button>
        <Button color="danger" onClick={e => this.handleDelete(row.issuer_id)}>
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
  }

  setTableData({ page, filters }) {
    const filtersQuery = stringifyQuery(filters);
    const url = `/issuers?page=${page}&${filtersQuery}`;

    this.props.history.push(url);
  }

  getGoBackUrl() {
    return this.props.location.pathname + this.props.location.search;
  }

  render() {
    return (
      <Page
        title="Issuers"
        breadcrumbs={[{ name: 'Issuers', active: true }]}
        history={this.props.history}
      >
        <Row>
          <Col>
            <Button
              tag={Link}
              to={{
                pathname: '/issuers/create',
                state: { goBackUrl: this.getGoBackUrl() },
              }}
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
              <CardBody>
                <IssuersTable
                  page={getQueryParam(this.props.location.search, 'page') || 1}
                  filters={{
                    name:
                      getQueryParam(this.props.location.search, 'name') || '',
                  }}
                  setTableData={this.setTableData.bind(this)}
                  setSetLoading={setLoading => (this._setLoading = setLoading)}
                  setRefresh={refresh => (this._refresh = refresh)}
                  renderButtons={row => this.renderButtons(row)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default IssuersPage;
