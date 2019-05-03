import React from 'react';
import { MdClearAll, MdKeyboardArrowLeft } from 'react-icons/md';
import { Button, ButtonGroup, Nav, Navbar } from 'reactstrap';
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
    const goBackUrl = this.props.goBackUrl;

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <ButtonGroup>
            <Button outline onClick={this.handleSidebarControlButton}>
              <MdClearAll size={25} />
            </Button>
            {goBackUrl ? (
              <Button
                outline
                onClick={() => this.props.history.push(goBackUrl)}
              >
                <MdKeyboardArrowLeft size={25} />
              </Button>
            ) : null}
          </ButtonGroup>
        </Nav>
        <Nav navbar />

        <Nav navbar className={bem.e('nav-right')} />
      </Navbar>
    );
  }
}

export default Header;
