import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Col, Card, CardBody } from 'reactstrap';
import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';
import IssuersTable from 'components/IssuersTable';
import { deleteIssuer } from 'services/issuersService';

class IssuersPage extends React.Component {
  handleDelete(issuerId, setLoading, refresh) {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setLoading(true);
      deleteIssuer(issuerId)
        .then(() => {
          refresh();
        })
        .catch(err => {
          setLoading(false);
          alert(err.message);
        });
    }
  }

  renderButtons(row, setLoading, refresh) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button tag={Link} to={`/issuers/${row.issuer_id}`} color="info">
          <MdModeEdit />
        </Button>
        <Button
          color="danger"
          onClick={e => this.handleDelete(row.issuer_id, setLoading, refresh)}
        >
          <MdDelete />
        </Button>
      </ButtonGroup>
    );
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
                  renderButtons={(row, setLoading, refresh) =>
                    this.renderButtons(row, setLoading, refresh)
                  }
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
