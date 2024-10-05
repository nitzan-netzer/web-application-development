'use client';

import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import '../styles/ProductLinks.css'; 

export default function ProductsLinks() {
  const categories = [
    { name: 'clothes', image: '/category_clothes.jpg', title: "ביגוד ואופנה"},
    { name: 'electrical', image: '/category_electrical.jpg', title: "מוצרי חשמל"},
    { name: 'jewelry', image: '/category_jewelry.jpg', title: "תכשיטים"},
    { name: 'musical', image: '/category_musical.jpg', title: "מוזיקה"},
    { name: 'sport', image: '/category_sport.jpg', title: "אביזרי ספורט"},
    { name: 'toys', image: '/category_toys.jpg', title: "משחקים וצעצועים"}
  ];

  return (
    <Container>
      <br />
      <Row className="justify-content-center">
        <h1 style={{ textAlign: 'center', 
                    color: '#63A55E',
                    textShadow: '-1px -1px 0 #BFD1BD, 1px -1px 0 #BFD1BD, -1px 1px 0 #BFD1BD, 1px 1px 0 #BFD1BD',
                    fontWeight: 'bold'}}> באתר שלנו תוכלו למצוא </h1>
        <br></br>
        {categories.map((category, index) => (
          <Col xs={6} md={4} lg={2} key={index}>
            <a href={`/products?category=${category.name}`} target="_blank" rel="noopener noreferrer">
              <Image src={category.image} className="fixed-size-img" roundedCircle />
            </a>
            <div className="overlay-text" style={{color: '#63A55E', 
                                                  fontFamily: 'Lucida Console, Courier New, monospace', 
                                                  fontWeight: 'bold' }}>
              {category.title}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
