import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import IssuersTable from 'components/IssuersTable';
import { deleteIssuer } from 'services/issuersService';
import { getQueryParam, stringifyQuery } from 'utils/query';

class IssuersPage extends React.Component {
  constructor(props) {
    super(props);

    window.sessionStorage.setItem(
      'ISSUERS_PAGE',
      props.location.pathname + props.location.search,
    );
  }

  componentDidUpdate() {
    window.sessionStorage.setItem(
      'ISSUERS_PAGE',
      this.props.location.pathname + this.props.location.search,
    );
  }

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

  setTableData({ page, filters }) {
    const filtersQuery = stringifyQuery(filters);
    const url = `/issuers?page=${page}&${filtersQuery}`;

    window.sessionStorage.setItem('ISSUERS_PAGE', url);
    this.props.history.push(url);
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
