'use client';


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Navbar } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Filters, { FiltersState } from './ProductsFilters';


interface Product {
    location: object;
    name: string;
    image: string;
    category: string;
    status: string;
    description: string;
    price: number;
    userId: string;
    productId: string;
    quantity: number;
}

type Props = {
    allProducts: Product[]
}

const ProductsPage: React.FC<Props> = ({ allProducts }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    

    useEffect(() => {
        const savedCart = localStorage.getItem('shopping cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0 && typeof window !== 'undefined') {
            localStorage.setItem('shopping cart', JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (Array.isArray(allProducts) && allProducts.length > 0) {
          // Filter out products with status 'soldOut'
          const availableProducts = allProducts.filter(
            (product) => product.status !== 'soldOut'
          );
          setProducts(availableProducts);
          setFilteredProducts(availableProducts);
        } else {
          setProducts([]);
          setFilteredProducts([]);
        }
      }, [allProducts]);

    const applyFilters = (filters: FiltersState) => {
        const { category, queryType, name, minPrice, maxPrice } = filters;
        let filtered = [...products];

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
        console.log("updatedCart", updatedCart);
        const data = localStorage.getItem('shopping cart');
        console.log("shopping cart", data);
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

            <div className="product-count" dir="rtl" style={{ marginBottom: '1rem'}}>
                <span>מספר מוצרים מוצגים: </span>
                <Badge bg="info">{filteredProducts.length}</Badge>
            </div>

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
