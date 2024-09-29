'use client';

import React from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Row, Col, Button, Card } from "react-bootstrap";


type Product = {
    id: number,
    name: string,
    Category: string,
    price: number,
    quality: string,
    image: string,
    description: string,
    seller: string,
}

type Props = {
    products: Product[],
}

export default function ProductsCards({products}: Props) {

    return (
        <Row className='justify-content-center'>
             <Col xs={10} sm={8} md={6} lg={9}>
                <Row className='justify-content-center'>
                    {!!products && products.map((product) => ( // product is typed as any
                        <Col key={product.id} xs={12} sm={8} md={6} lg={4} className="mb-4">
                            <Card className="d-flex flex-column" style={{ height: '100%' }}>
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className="flex-grow-1">
                                        {product.description}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <section><strong>Quality:</strong> {product.quality}</section>
                                        <section><strong>Price:</strong> ${product.price}</section>
                                        <section><strong>Seller:</strong> {product.seller}</section>
                                    </div>
                                    <Button variant="primary" style={{ marginTop: 'auto' }}>Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>

            <Col xs={2} sm={4} md={6} lg={3}>
                    {/* fix the hydration and add search, sort and filter */}
            </Col>
        </Row>
    );
}