'use client';

import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function About() {
  return (
    <section id="about" className='block acout-block'>
            <Container fluid>
                <div className='title-holder'>
                    <h2>קצת עלינו</h2>
                </div>
                <div className='subtitle'>מזה רגל 2 ומי אנחנו</div>
                <br></br>
                <Row>
                    <Col sm={6}>
                        <Image src={'../assets/img1.jpg'} alt='About Us' />
                    </Col>
                    <Col sm={6} className="text-end">
                        <p>ברוכים הבאים ל"רגל 2" – המקום שבו קניות חכמות פוגשות קיימות סביבתית</p>
                        <p>באתר שלנו תוכלו למצוא מגוון רחב של מוצרי יד שנייה, החל מבגדים ואביזרים ועד רהיטים ופריטים לבית, כולם במצב מעולה ומחכים להתחיל פרק חדש</p>
                        <p>ב"רגל 2" אנחנו מאמינים שבעולם של היום, הדרך הנכונה לקנות היא דרך שמצמצמת את הזיהום ואת הצורך במוצרים חדשים, ובו זמנית הופכת את הקנייה לזולה יותר</p>
                        <p>הצטרפו אלינו למסע אל עבר עולם ירוק יותר, שבו כל רכישה היא גם חיסכון לכיס וגם צעד חשוב לשמירה על הסביבה</p>
                    </Col>
                </Row>
            </Container>
        </section>
  )
}

export default About