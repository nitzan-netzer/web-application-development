'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import Filters, { FiltersState } from './ProductsFilters';
import ProductCardAdmin from './ProductCardAdmin';
import { deleteProduct } from '@/srcapi/nitApi';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

interface ProductLocation {
  type: string;
  coordinates: Array<number>;
}

interface Product {
  location: ProductLocation;
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

const ProductsPageAdmin: React.FC<Props> = ({ allProducts }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams(); // Get search parameters

  // Retrieve category from URL query parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory(undefined);
    }
  }, [searchParams]);

  // Set initial products, excluding sold-out items
  useEffect(() => {
    if (Array.isArray(allProducts) && allProducts.length > 0) {
      const availableProducts = allProducts.filter(
        (product) => product.status !== 'soldOut'
      );
      setProducts(availableProducts);
    } else {
      setProducts([]);
    }
  }, [allProducts]);

  // Filter products based on category from URL
  useEffect(() => {
    if (category) {
      const filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      const productId = product.productId;
      console.log('Product ID:', productId);
      try {
        await deleteProduct(productId);

        // Update the products and filteredProducts state after deletion
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.productId !== productId)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((p) => p.productId !== productId)
        );

        alert(`${product.name} deleted successfully`);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again later.');
      }
    }
  };

  const applyFilters = (filters: FiltersState) => {
    console.log('Applying Filters:', filters);
    const { category: filterCategory, queryType, name, minPrice, maxPrice } = filters;
    let filtered = products;

    const minPriceNum = minPrice ? parseFloat(minPrice) : null;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : null;

    if (filterCategory || name || minPrice || maxPrice) {
      if (queryType === 'and') {
        filtered = products.filter((product) => {
          const categoryMatch = filterCategory
            ? product.category.toLowerCase() === filterCategory.toLowerCase()
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
          const categoryMatch = filterCategory
            ? product.category.toLowerCase() === filterCategory.toLowerCase()
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

  return (
    <Container>
      <Filters applyFilters={applyFilters} />

      <div
        className="product-count"
        dir="rtl"
        style={{ marginBottom: '1rem' }}
      >
        <span>מספר מוצרים מוצגים: </span>
        <Badge bg="info">{filteredProducts.length}</Badge>
      </div>

      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.productId} sm={12} md={6} lg={4}>
            <ProductCardAdmin product={product} handleDelete={handleDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPageAdmin;
