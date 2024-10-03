'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();

  const handleClickRegister = () => {
    router.push('/register'); // Use router.push instead of window.location.href
  };

  const handleClickLogin = () => {
    router.push('/login');
  };

  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={'/logo.jpeg'}
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="רגל 2 logo"
          />
          <Button href="/auth/register" variant="outline-success"
            style={{ marginLeft: '20px', position: 'relative', top: '10px' }}>הרשמה</Button>
          <Button href="/auth/login" variant="outline-success"
            style={{ marginLeft: '20px', position: 'relative', top: '10px' }}>התחברות</Button>
          <a href="/cart" className="ms-2">
            <img
              src={'/shopping-cart.png'}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Icon"
              style={{
                position: 'relative',
                top: '10px',
                left: '10px',
                cursor: 'pointer'
              }}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto flex-row-reverse"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/" className="mx-3">דף הבית</Nav.Link>
            <Nav.Link href="/products" className="mx-3">ההמוצרים שלנו</Nav.Link>
            <Nav.Link href="/about" className="mx-3">אז מי אנחנו</Nav.Link>
            <Nav.Link href="/contact-us" className="mx-3">צרו קשר</Nav.Link>
            <Nav.Link href="/policy" className="mx-3">תקנון</Nav.Link>
            <Nav.Link href="/toolkit" className="mx-3">ארגז כלים</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
