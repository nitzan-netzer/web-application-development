'use client';

import React from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/pagesLinks.css'; 

export default function MarketingComponent() {
    return (
        <Container className="mt-5" dir="rtl">
            <h2 className="marketing-heading">ברוכים הבאים לאתר שלנו!</h2>
            <Row className="justify-content-center flex-column">
                {/* About Us Card */}
                <Col xs={12} className="mb-4">
                    <Card className="marketing-card">
                        <Card.Body>
                            <Card.Title className="marketing-card-title">אודותינו</Card.Title>
                            <Card.Text>
                                כאן תוכלו לקרוא על מטרת האתר ולגלות איך אנחנו יכולים לעזור לכם.
                            </Card.Text>
                            <Link href="/about" passHref>
                                <Button variant="success">למידע נוסף</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Contact Us Card */}
                <Col xs={12} className="mb-4">
                    <Card className="marketing-card">
                        <Card.Body>
                            <Card.Title className="marketing-card-title">צור קשר</Card.Title>
                            <Card.Text>
                                נתקלתם בבעיה? כאן תוכלו למצוא את כל הדרכים ליצור קשר עם צוות התמיכה שלנו.
                            </Card.Text>
                            <Link href="/contact-us" passHref>
                                <Button variant="warning">פנו אלינו</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Policy Card */}
                <Col xs={12} className="mb-4">
                    <Card className="marketing-card">
                        <Card.Body>
                            <Card.Title className="marketing-card-title">התקנון והערכים שלנו</Card.Title>
                            <Card.Text>
                                כאן תוכלו לקרוא את התקנון של האתר ואת הערכים שלנו.
                            </Card.Text>
                            <Link href="/Policy" passHref>
                                <Button variant="success">קראו את התקנון</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Personal Page Card */}
                <Col xs={12} className="mb-4">
                    <Card className="marketing-card">
                        <Card.Body>
                            <Card.Title className="marketing-card-title">הדף האישי שלי</Card.Title>
                            <Card.Text>
                                כאן תוכלו לערוך את המידע האישי שלכם ולעדכן את הפרטים האישיים.
                            </Card.Text>
                            <Link href="/personalPage" passHref>
                                <Button variant="warning">ערכו את הפרטים</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
