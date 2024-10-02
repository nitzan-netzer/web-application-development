'use client';


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Navbar } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Filters, { FiltersState } from './Filters';


interface Product {
    name: string;
    category: string;
    status: string;
    description: string;
    price: number;
    userId: string;
    seller: string;
    image?: string;
}

type Props = {
    products: Product[]
}

// type Product = {
//     id: number,
//     name: string,
//     Category: string,
//     price: number,
//     quality: string,
//     image: string,
//     description: string,
//     seller: string,
// }

const ProductsPage: React.FC = () => {
    // Test data
    const ProductsTest: Product[] = [
        {
            name: 'shirt',
            category: 'clothes',
            status: 'available',
            description: 'This is a great product.',
            price: 99.99,
            userId: '603d53a7a262f90b60d8dbcf',
            image: 'https://via.placeholder.com/150',
            seller: 'Dana',
        },
        {
            name: 'iphone 13',
            category: 'Electronics',
            status: 'available',
            description: 'This is a great product.',
            price: 9999.99,
            userId: '603d53a7a262f90b60d8dbc5',
            image: 'https://via.placeholder.com/150',
            seller: 'Dana',
        },
        {
            name: 'piano',
            category: 'music',
            status: 'available',
            description: 'This is a great product.',
            price: 9.99,
            userId: '603d53a7a262f90b668dbcf',
            image: 'https://via.placeholder.com/150',
            seller: 'Dana',
        },
        {
            name: 'bull',
            category: 'animals',
            status: 'available',
            description: 'This is a great product.',
            price: 959.99,
            userId: '603153a7a262f90b60d8dbcf',
            image: 'https://via.placeholder.com/150',
            seller: 'Dana',
        },
        {
            name: 'costume',
            category: 'clothes',
            status: 'available',
            description: 'This is a great product.',
            price: 99.99,
            userId: '603d53a7a262f90b60d8dbcf',
            image: 'https://via.placeholder.com/150',
            seller: 'Dana',
        },
        {
            name: 'pencil',
            category: 'school',
            status: 'available',
            description: 'This is a great product.',
            price: 349.99,
            userId: '603d53a7sd262f90b60d8dbcf',
            image: 'https://via.placeholder.com/150',
            seller: 'Dana',
        },
    ];

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>(() => {
        const savedCart = localStorage.getItem('shopping cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    );

    useEffect(() => {
        localStorage.setItem('shopping cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        // Fetch products from API
        setProducts(ProductsTest);
        setFilteredProducts(ProductsTest);
    }, []);

    const applyFilters = (filters: FiltersState) => {
        console.log('Applying Filters:', filters);
        const { category, queryType, name, minPrice, maxPrice } = filters;
        let filtered = products;

        const minPriceNum = minPrice ? parseFloat(minPrice) : null;
        const maxPriceNum = maxPrice ? parseFloat(maxPrice) : null;

        if (category || name || minPrice || maxPrice) {
            if (queryType === 'and') {
                filtered = products.filter((product) => {
                    const categoryMatch = category
                        ? product.category.toLowerCase() === category.toLowerCase()
                        : true;
                    const nameMatch = name
                        ? product.name.toLowerCase().includes(name.toLowerCase())
                        : true;
                    const minPriceMatch = minPriceNum !== null ? product.price >= minPriceNum : true;
                    const maxPriceMatch = maxPriceNum !== null ? product.price <= maxPriceNum : true;

                    return (
                        categoryMatch &&
                        nameMatch &&
                        minPriceMatch &&
                        maxPriceMatch
                    );
                });
            } else if (queryType === 'or') {
                filtered = products.filter((product) => {
                    const categoryMatch = category
                        ? product.category.toLowerCase() === category.toLowerCase()
                        : false;
                    const nameMatch = name
                        ? product.name.toLowerCase().includes(name.toLowerCase())
                        : false;
                    const minPriceMatch = minPriceNum !== null ? product.price >= minPriceNum : false;
                    const maxPriceMatch = maxPriceNum !== null ? product.price <= maxPriceNum : false;

                    return (
                        categoryMatch ||
                        nameMatch ||
                        minPriceMatch ||
                        maxPriceMatch
                    );
                });
            }
        }

        setFilteredProducts(filtered);
    };


    const addToCart = (product: Product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    };

    return (
        <Container>
            <Navbar bg="light" className="mb-4" dir="rtl">
                <Navbar.Brand>המוצרים שלנו</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        כמות מוצרים בסל הקניות שלך: <Badge bg="secondary">{cart.length}</Badge>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <Filters applyFilters={applyFilters} />

            <Row>
                {filteredProducts.map((product) => (
                    <Col key={product.name} sm={12} md={6} lg={4}>
                        <ProductCard product={product} addToCart={addToCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductsPage;
