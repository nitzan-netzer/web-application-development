'use client';

import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import '../styles/ProductLinks.css'; 

function ProductsLinks() {
  const categories = [
    { name: 'clothes', image: '/category_clothes.jpg' },
    { name: 'electrical', image: '/category_electrical.jpg' },
    { name: 'jewelry', image: '/category_jewelry.jpg' },
    { name: 'musical', image: '/category_musical.jpg' },
    { name: 'sport', image: '/category_sport.jpg' },
    { name: 'toys', image: '/category_toys.jpg' }
  ];

  return (
    <Container>
      <br />
      <Row className="justify-content-center">
        {categories.map((category, index) => (
          <Col xs={6} md={4} lg={2} key={index}>
            <a href={`https://example.com/${category.name}`} target="_blank" rel="noopener noreferrer">
              <Image src={category.image} className="fixed-size-img" roundedCircle />
            </a>
            <div className="overlay-text">
              {category.name}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsLinks;
