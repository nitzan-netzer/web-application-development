"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/srcactions/auth";
import styles from "@/srcstyles/Header.module.css"
type HeaderProps = {
  user: any;
};

function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };
  const username = user?.name || "אורח"; // Default to "אורח" if user is undefined
  const isAdmin = user?.isAdmin; // Check if user is admin
  const isSeller = user?.isSeller; // Check if user is seller
  const isBuyer = (!isAdmin && !isSeller); // A user that is not admin or seller

  return (
    <Navbar fixed="top" expand="lg" className={`bg-body-tertiary ${styles.navbar}`}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src={'/logo.jpeg'}
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="רגל 2 logo"
          />
        </Navbar.Brand>

        {/* Greeting user */}

        <span style={{ marginLeft: "20px", fontSize: "18px" }}>
          שלום, {username}
        </span>
        {username !== "אורח" && (
              <Nav.Link href="/personalArea" className="mx-3">
                האזור אישי
              </Nav.Link>
            )}

        <div className={styles['auth-buttons']}>
          {user ? (
            <Button
              variant="outline-success"
              className={styles.button}
              onClick={handleLogout}
            >
              התנתקות
            </Button>
          ) : (
            <>
              <Button
                href="/auth/register"
                variant="outline-success"
                className={styles.button}
              >
                הרשמה
              </Button>
              <Button
                href="/auth/login"
                variant="outline-success"
                className={styles.button}
              >
                התחברות
              </Button>
            </>
          )}
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className={`ms-auto flex-row-reverse ${styles.navbarNav}`} navbarScroll>
            <Nav.Link href="/" className={`${styles.navLink} mx-3`}>
              דף הבית
            </Nav.Link>
            <Nav.Link href="/about" className={`${styles.navLink} mx-3`}>
              אז מי אנחנו
            </Nav.Link>
            <Nav.Link href="/contact-us" className={`${styles.navLink} mx-3`}>
              צרו קשר
            </Nav.Link>
            <Nav.Link href="/policy" className={`${styles.navLink} mx-3`}>
              תקנון
            </Nav.Link>

            {/* Conditionally render Admin links */}
            {isAdmin && (
              <>
                <Nav.Link href="/toolkit" className={`${styles.navLink} mx-3`}>
                  ארגז כלים
                </Nav.Link>
                <Nav.Link href="/usersAdmin" className={`${styles.navLink} mx-3`}>
                  ניהול משתמשים
                </Nav.Link>
                <Nav.Link href="/productsAdmin" className={`${styles.navLink} mx-3`}>
                  ניהול מוצרים
                </Nav.Link>
              </>
            )}

            {/* Conditionally render Seller link */}
            {isSeller && (
              <Nav.Link href="/toolkit" className={`${styles.navLink} mx-3`}>
                ארגז כלים
              </Nav.Link>
            )}

            {/* Conditionally render Buyer links */}
            {isBuyer && username !== 'אורח' && (
              <>
                <Nav.Link href="/products" className={`${styles.navLink} mx-3`}>
                  המוצרים שלנו
                </Nav.Link>
                <Nav.Link href="/toolkit" className={`${styles.navLink} mx-3`}>
                  האם תרצה להיות מוכר
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;