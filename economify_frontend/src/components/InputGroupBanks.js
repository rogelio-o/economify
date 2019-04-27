import React from 'react';
import { ButtonGroup, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MdCheck } from 'react-icons/md';
import InputGroupBase from 'components/InputGroupBase';
import BanksAccountsTable from 'components/BanksAccountsTable';

class InputGroupBanks extends React.Component {
  state = {
    open: false,
    page: 1,
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  handleClick(row) {
    this.props.handleChange(this.props.id, row.bank_account_id);
    this.setState({ open: false });
  }

  renderButtons(row) {
    return (
      <ButtonGroup className="mr-3 mb-3">
        <Button color="info" onClick={() => this.handleClick(row)}>
          <MdCheck />
        </Button>
      </ButtonGroup>
    );
  }

  setPage(page) {
    this.setState({ page });
  }

  render() {
    return (
      <InputGroupBase
        id={this.props.id}
        label={this.props.label}
        model={this.props.model}
      >
        <Button color="primary" onClick={() => this.toggleOpen()}>
          Change
        </Button>

        {this.props.model.value}

        <Modal
          isOpen={this.state.open}
          toggle={() => this.toggleOpen()}
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleOpen()}>
            Banks Accounts
          </ModalHeader>
          <ModalBody>
            <BanksAccountsTable
              page={this.state.page}
              setPage={num => this.setPage(num)}
              renderButtons={row => this.renderButtons(row)}
            />
          </ModalBody>
        </Modal>
      </InputGroupBase>
    );
  }
}

export default InputGroupBanks;
