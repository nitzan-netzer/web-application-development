'use client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React from 'react'

function Footer() {
  return (
    <footer className='bg-dark text-light py-3'>
            <Container>
                <Row>
                    <Col xs={12} md={4}>
                        <h5>צרו קשר</h5>
                        <p>
                            מוזמנים ליצור קשר עם מרכז התמיכה שלנו
                        </p>
                    </Col>
                    <Col xs={12} md={4}>
                        <h5>פרטי התקשרות ותמיכה</h5>
                        <ul className='list-unstyled'>
                            <li><a href="mailto:minhal@hdq.colman.ac.il">minhal@hdq.colman.ac.il</a></li>
                            <li><a href="tel:03-9634140">03-9634140</a></li>
                            <li><a href="https://maps.app.goo.gl/zm84pwVWypExwUYW8" target="_blank">
                                המכללה למינהל ראשון לציון
                            </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
  )
}

export default Footer