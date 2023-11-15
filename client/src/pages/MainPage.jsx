/* eslint-disable react/prop-types */
import Navbar from 'react-bootstrap/Navbar';
import { React, useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Spinner, Container, Nav } from 'react-bootstrap';

import Header from '../components/Header'
import NavBar from '../components/NavBar'
import FilterProposals from '../components/FilterProposals'

function MainPage(props) {
  return (
        <>
          <Header/>
          <NavBar/>
          <FilterProposals ProposalsList={props.ProposalsList} setProposalsList={props.setProposalsList}/>
        </>
  )
}

export default MainPage