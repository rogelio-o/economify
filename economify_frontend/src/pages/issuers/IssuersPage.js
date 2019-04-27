import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import IssuersTable from 'components/IssuersTable';
import { deleteIssuer } from 'services/issuersService';
import { getQueryParam } from 'utils/query';

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
        <Button tag={Link} to={`/issuers/${row.issuer_id}`} color="info">
          <MdModeEdit />
        </Button>
        <Button color="danger" onClick={e => this.handleDelete(row.issuer_id)}>
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
  }

  setPage(num) {
    this.props.history.push(`/issuers?page=${num}`);
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
              <CardBody>
                <IssuersTable
                  page={getQueryParam(this.props.location.search, 'page') || 1}
                  setPage={num => this.setPage(num)}
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
