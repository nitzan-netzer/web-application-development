'use client';
import React from 'react';
import Link from 'next/link';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

export default function MarketingComponent() {
    return (
        <Container className="mt-5" dir="rtl">
            <h2 className="text-center mb-4" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                ברוכים הבאים לאתר שלנו!
            </h2>
            <Row className="justify-content-center flex-column">
                {/* About Us Card */}
                <Col xs={12} className="mb-4">
                    <Card className="text-center" style={{ borderColor: '#FFC107' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#4CAF50' }}>אודותינו</Card.Title>
                            <Card.Text>
                                כאן תוכלו לקרוא על מטרת האתר ולגלות איך אנחנו יכולים לעזור לכם.
                            </Card.Text>
                            <Link href="/about" passHref>
                                <Button variant="success" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                                    למידע נוסף
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Contact Us Card */}
                <Col xs={12} className="mb-4">
                    <Card className="text-center" style={{ borderColor: '#FFC107' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#4CAF50' }}>צור קשר</Card.Title>
                            <Card.Text>
                                נתקלתם בבעיה? כאן תוכלו למצוא את כל הדרכים ליצור קשר עם צוות התמיכה שלנו.
                            </Card.Text>
                            <Link href="/contact-us" passHref>
                                <Button variant="warning" style={{ backgroundColor: '#FFC107', borderColor: '#FFC107', color: '#fff' }}>
                                    פנו אלינו
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Policy Card */}
                <Col xs={12} className="mb-4">
                    <Card className="text-center" style={{ borderColor: '#FFC107' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#4CAF50' }}>התקנון והערכים שלנו</Card.Title>
                            <Card.Text>
                                כאן תוכלו לקרוא את התקנון של האתר ואת הערכים שלנו.
                            </Card.Text>
                            <Link href="/Policy" passHref>
                                <Button variant="success" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                                    קראו את התקנון
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Personal Page Card */}
                <Col xs={12} className="mb-4">
                    <Card className="text-center" style={{ borderColor: '#FFC107' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#4CAF50' }}>הדף האישי שלי</Card.Title>
                            <Card.Text>
                                כאן תוכלו לערוך את המידע האישי שלכם ולעדכן את הפרטים האישיים.
                            </Card.Text>
                            <Link href="/personalPage" passHref>
                                <Button variant="warning" style={{ backgroundColor: '#FFC107', borderColor: '#FFC107', color: '#fff' }}>
                                    ערכו את הפרטים
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}