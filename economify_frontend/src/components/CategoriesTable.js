import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { MdModeEdit, MdDelete } from 'react-icons/md';

const BanksAccountsTable = ({ data, handleDelete }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={`row-${row.category_id}`}>
            <td>{row.name}</td>
            <td>{row.type}</td>
            <td>{row.description}</td>
            <td>
              <ButtonGroup className="mr-3 mb-3">
                <Button
                  tag={Link}
                  to={`/categories/${row.category_id}`}
                  color="info"
                >
                  <MdModeEdit />
                </Button>
                <Button
                  color="danger"
                  onClick={e => handleDelete(row.category_id)}
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

export default BanksAccountsTable;
