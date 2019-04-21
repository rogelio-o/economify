import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { MdModeEdit, MdDelete } from 'react-icons/md';

const TransactionsTable = ({ data, handleDelete }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Concept</th>
          <th>Date</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={`row-${row.transaction_id}`}>
            <td>{row.concept}</td>
            <td>{row.date}</td>
            <td>{row.amount}</td>
            <td>
              <ButtonGroup className="mr-3 mb-3">
                <Button
                  tag={Link}
                  to={`/transactions/${row.transaction_id}`}
                  color="info"
                >
                  <MdModeEdit />
                </Button>
                <Button
                  color="danger"
                  onClick={e => handleDelete(row.transaction_id)}
                >
                  <MdDelete />
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TransactionsTable;
