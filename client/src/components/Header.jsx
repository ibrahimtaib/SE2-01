import 'bootstrap-icons/font/bootstrap-icons.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import React from 'react';

const Header = () => {
  return (
    <Navbar expand="md" style={{ background: '#003576' }} className="w-100">
      <Container fluid className="p-0">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://planet.polito.it/app/uploads/2021/03/Polito_Logo_2021_BIANCO-768x337.png"
            width="200"
            className="d-inline-block align-top"
            style={{ marginLeft: '20%' }}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};


export default Header;