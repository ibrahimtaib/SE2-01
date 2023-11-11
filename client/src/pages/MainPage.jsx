/* eslint-disable react/prop-types */
import Navbar from 'react-bootstrap/Navbar';
import { React, useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Spinner, Container, Nav } from 'react-bootstrap';

import Header from '../components/Header'
import NavBar from '../components/NavBar'
import FilterProposals from '../components/FilterProposals'

function MainPage({user}) {
  const [myUser, setMyUser] = useState(user);
  const [LoggedIn, setLoggedIn] = useState(false)

  return (
        <>
          <Header/>
          <NavBar/>
          <FilterProposals/>
        </>
  )
}

export default MainPage