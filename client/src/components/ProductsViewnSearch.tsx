'use client';

import React, { useState, useEffect } from 'react';
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
    products: Product[]
}


export default function ProductsCards({ products }: Props) {

    const productsList = Object.values(products);

    const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsList);
    const [categoryQuery, setCategoryQuery] = useState("");
    const [sellerQuery, setSellerQuery] = useState("");
    const [priceQuery, setPriceQuery] = useState("");
    const [nameQuery, setNameQuery] = useState("");
    const [qualityQuery, setQualityQuery] = useState("");


    useEffect(() => {
        let updatedProducts = [...productsList];

        if (categoryQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.Category.toLowerCase().includes(categoryQuery.toLowerCase())
            );
        }

        if (sellerQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.seller.toLowerCase().includes(sellerQuery.toLowerCase())
            );
        }

        if (priceQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.price <= Number(priceQuery)
            );
        }

        if (nameQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.name.toLowerCase().includes(nameQuery.toLowerCase())
            );
        }

        if (qualityQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.quality.toLowerCase().includes(qualityQuery.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
    }, [categoryQuery, sellerQuery, priceQuery, nameQuery, qualityQuery, products]);

    return (

        <Row className='justify-content-center'>
            <Col xs={10} sm={8} md={6} lg={9}>
                <Row className='justify-content-center'>
                    {!!productsList && productsList.map((product) => (
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
                <div>
                    <input
                        type="text"
                        placeholder="Filter by Category"
                        value={categoryQuery}
                        onChange={(e) => setCategoryQuery(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Filter by Seller"
                        value={sellerQuery}
                        onChange={(e) => setSellerQuery(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceQuery}
                        onChange={(e) => setPriceQuery(e.target.value)}
                    />

                    <ul>
                        {filteredProducts.map(product => (
                            <li key={product.id}>
                                <strong>{product.name}</strong> - {product.Category} - ${product.price}
                            </li>
                        ))}
                    </ul>
                </div>
            </Col>
        </Row>

    );
}
