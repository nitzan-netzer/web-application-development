'use client';

import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import '../styles/About.css';

function About() {

    const link = "https://www.academy.org.il/?utm_source=google&utm_medium=cpc&utm_content=154182892207&utm_term=%D7%94%D7%9E%D7%9B%D7%9C%D7%9C%D7%94%20%D7%9C%D7%9E%D7%A0%D7%94%D7%9C&utm_campaign=search_brand&utm_id=17646779236&gad_source=1&gclid=Cj0KCQjwsJO4BhDoARIsADDv4vASppeUwWVFh9ntfJLaE3Va76t4t_H32TTqB1GD-CrtoyjLcVHvZwYaAjsSEALw_wcB";

    return (
        <div dir="rtl">
            <section id="about" className='block acout-block'>
                <Container fluid>
                    <div className='title-holder'>
                        <h2>קצת עלינו</h2>
                    </div>
                    <div className='subtitle'>מזה רגל 2 ומי אנחנו</div>
                    <br></br>
                    <Row>
                        <Col sm={6}>
                            <Image src={'./img1.jpg'} alt='About Us' />
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
            <br></br>
            <div className="multi-column-container">
                <h1>הצטרפו אלינו ברשתות</h1>
                <div className="multi-column-links">
                    <a href={link} target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href={link} target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href={link} target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
        </div>
    )
}

export default About;