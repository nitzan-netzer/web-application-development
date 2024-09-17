'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React from 'react'
import { useRouter } from 'next/navigation';




function Header() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/login');
  }
  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={'/logo.jpeg'}
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="רגל 2 logo"
          />
          <Button onClick={handleClick} variant="outline-success"
            style={{ marginLeft: '20px', position: 'relative', top: '10px' }}>להתחברות/להרשמה</Button>
          {/* <a href="/target-page" className="ms-2">
            <img
              src={'/shopping-cart.png'}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Icon"
              style={{
                position: 'relative',
                top: '10px',  // Moves the image down by 10 pixels
                left: '5px',  // Moves the image to the right by 5 pixels
                cursor: 'pointer'
              }}
            />
          </a> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto flex-row-reverse" // Aligns the Nav links to the right
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#home" className="mx-3">דף הבית</Nav.Link>
            <Nav.Link href="#Products" className="mx-3">ההמוצרים שלנו</Nav.Link>
            <Nav.Link href="#About" className="mx-3">אז מי אנחנו</Nav.Link>
            <Nav.Link href="#Contacts" className="mx-3">צרו קשר</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header