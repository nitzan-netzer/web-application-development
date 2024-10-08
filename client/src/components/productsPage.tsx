'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Row, Col, Badge, Navbar } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Filters, { FiltersState } from './ProductsFilters';
import styles from "@/srcstyles/products-page.module.css";

interface productLocation {
    type: string;
    coordinates: Array<number>;
}
interface Product {
    location: productLocation;
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
    allProducts: Product[];
};

const ProductsPage: React.FC<Props> = ({ allProducts }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0 && typeof window !== 'undefined') {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (Array.isArray(allProducts) && allProducts.length > 0) {
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

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setCategory(categoryParam);
        } else {
            setCategory(undefined);
        }
    }, [searchParams]);

    useEffect(() => {
        if (category) {
            const filtered = products.filter(
                (product) =>
                    product.category.toLowerCase() === category.toString().toLowerCase()
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [category, products]);

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
                    const minPriceMatch =
                        minPriceNum !== null ? product.price >= minPriceNum : true;
                    const maxPriceMatch =
                        maxPriceNum !== null ? product.price <= maxPriceNum : true;

                    return categoryMatch && nameMatch && minPriceMatch && maxPriceMatch;
                });
            } else if (queryType === 'or') {
                filtered = products.filter((product) => {
                    const categoryMatch = category
                        ? product.category.toLowerCase() === category.toLowerCase()
                        : false;
                    const nameMatch = name
                        ? product.name.toLowerCase().includes(name.toLowerCase())
                        : false;
                    const minPriceMatch =
                        minPriceNum !== null ? product.price >= minPriceNum : false;
                    const maxPriceMatch =
                        maxPriceNum !== null ? product.price <= maxPriceNum : false;

                    return categoryMatch || nameMatch || minPriceMatch || maxPriceMatch;
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
        <Container className={styles.container}>
            <Navbar className={styles.navbar} dir="rtl">
                <Navbar.Brand>המוצרים שלנו</Navbar.Brand>
                <aside>
                    <p>כאן תוכלו למצוא את כלל המוצרים שלנו באתר</p>
                    <p>מוזמנים לבצע חיפושים שונים כדי למצוא את כל מה שצטרכו</p>
                </aside>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        כמות מוצרים בסל הקניות שלך:{' '}
                        <Badge bg="secondary" className={styles.badge}>{cart.length}</Badge>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <Filters applyFilters={applyFilters} />

            <div className={`product-count ${styles['product-count']}`} dir="rtl">
                <span>מספר מוצרים מוצגים: </span>
                <Badge className={styles.badge}>{filteredProducts.length}</Badge>
            </div>

            <Row>
                {filteredProducts.map((product) => (
                    <Col key={product.productId} sm={12} md={6} lg={4}>
                        <ProductCard product={product} addToCart={addToCart} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductsPage;