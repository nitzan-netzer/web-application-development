'use client';

import React, { useState } from "react";
import Fuse from "fuse.js";
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

    const [input, setInput] = useState<any>(productsList);
    const [nameQuery, setNameQuery] = useState(""); // Search term for name
    const [emailQuery, setEmailQuery] = useState(""); // Search term for email
    const [ageQuery, setAgeQuery] = useState("");

    

    const handleSearch = () => {
        let filteredProducts = productsList; // Start with the full list of friends

        // First, create a Fuse instance and search by 'name' if the nameQuery is not empty
        if (nameQuery.length > 0) {
            const fuseByName = new Fuse(filteredProducts, { keys: ["name"] });
            filteredProducts = fuseByName.search(nameQuery).map((result) => result.item);
        }

        // Then, filter the results by 'email' if the emailQuery is not empty
        if (emailQuery.length > 0) {
            const fuseByEmail = new Fuse(filteredProducts, { keys: ["email"] });
            filteredProducts = fuseByEmail.search(emailQuery).map((result) => result.item);
        }

        // Finally, filter the results by 'age' if the ageQuery is not empty
        if (ageQuery.length > 0) {
            const fuseByAge = new Fuse(filteredProducts, { keys: ["age"] });
            filteredProducts = fuseByAge.search(ageQuery).map((result) => result.item);
        }

        setInput(filteredProducts); // Update the state with the filtered results
    };

    return (

        <Row className='justify-content-center'>
            <Col xs={10} sm={8} md={6} lg={9}>
                <Row className='justify-content-center'>
                    {!!productsList && productsList .map((product) => (
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
                    {/* Input for name search */}
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={nameQuery}
                        onChange={(e) => setNameQuery(e.target.value)}
                    />

                    {/* Input for email search */}
                    <input
                        type="text"
                        placeholder="Search by email"
                        value={emailQuery}
                        onChange={(e) => setEmailQuery(e.target.value)}
                    />

                    {/* Input for age search */}
                    <input
                        type="text"
                        placeholder="Search by age"
                        value={ageQuery}
                        onChange={(e) => setAgeQuery(e.target.value)}
                    />

                    <button onClick={handleSearch}>Search</button>

                    {/* Render the filtered search results */}
                    <ul>
                        {input.map((friend: any) => (
                            <li key={friend.id}>
                                {friend.name} - {friend.email} - {friend.age}
                            </li>
                        ))}
                    </ul>
                </div>
            </Col>
        </Row>

    );
}
