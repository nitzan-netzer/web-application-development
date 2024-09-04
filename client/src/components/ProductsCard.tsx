'use client';

import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container, Form } from "react-bootstrap";


var productsTest = [
    {
        id: 1,
        name: "Cool summer shirt",
        Category: "clothes",
        price: 50,
        quality: "Good quality",
        image: "./ShirtImg.jpeg",
        description: "Linen shorts sets are dominating this summer.",
        seller: "Rozallita"
    },

    {
        id: 2,
        name: "Phone printer",
        Category: "electrical",
        price: 150,
        quality: "Has been repaired twice",
        image: "./PrinterImg.jpeg",
        description: "Photo printer that connects to youre phone via bluetooth",
        seller: "Einav"
    },
    {
        id: 3,
        name: "Gold rings",
        Category: "jewelry",
        price: 200,
        quality: "Good quality",
        image: "./EarringsImg.jpeg",
        description: "Minimalist 18K Gold Hoop Earrings, Stainless Steel Hoops.",
        seller: "Or"
    },
    {
        id: 4,
        name: "Gitar",
        Category: "musical",
        price: 1000,
        quality: "Good quality",
        image: "./GitarImg.jpeg",
        description: "Electric Guitar, Ibanez Jem 105, Schecter",
        seller: "Nitzan"
    },
    {
        id: 5,
        name: "Tennis racket",
        Category: "sport",
        price: 500,
        quality: "Good quality",
        image: "./TenisRacketImg.jpeg",
        description: "Tennis racket for beginners, Federer, Nadal, Djok",
        seller: "Adir"
    },
    {
        id: 6,
        name: "Elephent puppet",
        Category: "toys",
        price: 20,
        quality: "Good quality",
        image: "./ElephentImg.jpeg",
        description: "Elephant puppet, Baby Elephant, Savanna, African",
        seller: "Dana"
    }

]

export default function ProductsCards() {
    return (
        <Row className='justify-content-center'>
            {productsTest.map(product => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card style={{ width: '18rem', height: '24rem', display: 'flex', flexDirection: 'column' }}>
                        <Card.Img 
                            variant="top" 
                            src={product.image} 
                            style={{ height: '8rem', objectFit: 'cover' }} 
                        />
                        <Card.Body style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text style={{ flexGrow: 1 }}>
                                {product.description}
                            </Card.Text>
                            <div style={{ marginBottom: 'auto' }}>
                                <section><strong>Price:</strong> ${product.price}</section>
                                <section><strong>Seller:</strong> {product.seller}</section>
                            </div>
                            <Button variant="primary" style={{ marginTop: 'auto' }}>Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}