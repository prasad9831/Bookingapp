import React, { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./Nav.css";
import { Link } from 'react-router-dom';

export const Mynav = () => {
  return (
    
      <Navbar expand="lg" className="bg-body-tertiary">
       <Container fluid>
            <Navbar.Brand href="#"><Link to="/"><img src='/img/logo2.png' width="70" height="50" alt='logo'/></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                // style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link><Link to="Movies" id='navl'>Movies</Link></Nav.Link>
                <Nav.Link><Link to="Events" id='navl'>Events</Link></Nav.Link>
                <Nav.Link><Link to="Shows" id='navl'>TV Shows</Link></Nav.Link>
                <Nav.Link><Link to="Sports" id='navl'>Horror</Link></Nav.Link>

              </Nav>
              <Form className="d-flex box">
                <a href='https://www.imdb.com/find?q=' target='_blank' rel='noopener noreferrer'><Form.Control
                  type="search"
                  placeholder="Search for Movies,Events,Plays,Sports and Streams"
                  className="me-2 w-50"
                  aria-label="Search"
                /></a>
                <Button variant="outline-success" className='button'>Search</Button>
              </Form>
            </Navbar.Collapse>
      </Container>
    </Navbar>
      
  )
}
