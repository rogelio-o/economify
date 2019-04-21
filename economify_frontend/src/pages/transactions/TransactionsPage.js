import React from 'react';
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  Card,
  CardBody,
  Table,
} from 'reactstrap';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import Page from 'components/Page';

const TransactionsPage = () => {
  return (
    <Page
      title="Transactions"
      breadcrumbs={[{ name: 'Transactions', active: true }]}
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Concept</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Payment 1</td>
                    <td>+ 200€</td>
                    <td>Incoming</td>
                    <td>Categorized</td>
                    <td>04/04/2019</td>
                    <td>
                      <ButtonGroup className="mr-3 mb-3">
                        <Button color="info">
                          <MdModeEdit />
                        </Button>
                        <Button color="danger">
                          <MdDelete />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default TransactionsPage;
