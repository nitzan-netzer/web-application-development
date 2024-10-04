'use client';


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import Filters, { FiltersState } from './ProductsFilters';
import ProductCardAdmin from './ProductCardAdmin';
import { deleteProduct } from '@/srcapi/nitApi';


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

const ProductsPageAdmin: React.FC<Props> = ({ allProducts }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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

    const handleDelete = async (product: Product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {

            const productId = product.productId;
            console.log("product ID : ",productId);
            try {
                deleteProduct(productId);

                setProducts(products.filter((p) => p.userId === product.userId));
                alert(`${product.name} deleted successfully`)
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

            <div className="product-count" dir="rtl" style={{ marginBottom: '1rem'}}>
                <span>מספר מוצרים מוצגים: </span>
                <Badge bg="info">{filteredProducts.length}</Badge>
            </div>

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

export default ProductsPageAdmin;
