'use client';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { logout } from '@/srcactions/auth';

type headerProps = {
  user?: any;
};

function Header({ user }: headerProps) {

  const router = useRouter();

  const logout = async () => {
    console.log('Logging out');
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
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

          {user ? (<>
            <Button variant="outline-success"
              style={{ marginLeft: '20px', position: 'relative', top: '10px' }} onClick={logout}>התנתקות</Button>
            {/* <Button href="/profile" variant="outline-success"
              style={{ marginLeft: '20px', position: 'relative', top: '10px' }}>פרופיל</Button> */}
          </>):(<>
            <Button href="/auth/register" variant="outline-success"
              style={{ marginLeft: '20px', position: 'relative', top: '10px' }}>הרשמה</Button>
            <Button href="/auth/login" variant="outline-success"
              style={{ marginLeft: '20px', position: 'relative', top: '10px' }}>התחברות</Button>
          </>)}

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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
