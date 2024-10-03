'use client';


import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Filters, { FiltersState } from './Filters';
import ProductCardAdmin from './ProductCardAdmin';

interface Product {
    name: string;
    category: string;
    status: string;
    description: string;
    price: number;
    userId: string;
    seller: string;
    image?: string;
    id: string;
}

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
            id: '603d53a7a262f90b60d8dbc3',
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
            id: '603d53a7a262f90b60d8dbc7',
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
            id: '603d53a7a262f90b60d8dbc9',
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
            id: '603d53a7a262f90b60d8dbc1',
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
            id: '603d53a7a262f90b60d8dbc2',
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
            id: '603d53a7a262f90b60d8dbc3',
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

    const handleDelete = async (product: Product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
            try {
                const response = await fetch(`http://localhost:3001/api/products/${product.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setProducts(products.filter((p) => p.userId === product.userId));
                    alert(`${product.name} deleted successfully`)
                }
                else {
                    alert(`Failed to delete ${product.name}.`);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again later.');
            }
        }
    }

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

    return (
        <Container>
            <Filters applyFilters={applyFilters} />

            <Row>
                {filteredProducts.map((product) => (
                    <Col key={product.name} sm={12} md={6} lg={4}>
                        <ProductCardAdmin product={product} handleDelete={handleDelete} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductsPage;
