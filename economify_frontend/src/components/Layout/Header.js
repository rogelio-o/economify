import React from 'react';
import { MdClearAll } from 'react-icons/md';
import { Button, Nav, Navbar } from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
  state = {};

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar />

        <Nav navbar className={bem.e('nav-right')} />
      </Navbar>
    );
  }
}

export default Header;
