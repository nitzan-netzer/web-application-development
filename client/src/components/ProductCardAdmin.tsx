'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';

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

  interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
  }

  const ProductCardAdmin: React.FC<ProductCardProps> = ({ product, addToCart }) => {
    return (
      <Card className="mb-4" dir="rtl">
        {product.image && <Card.Img variant="top" src={product.image} />}
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>מחיר:</strong> {product.price}
          </Card.Text>
          <Card.Text>
            <strong>מוכר:</strong> {product.seller}
          </Card.Text>
          <Button variant="danger" onClick={() => addToCart(product)}>
            מחק מוצר מהמאגר
          </Button>
        </Card.Body>
      </Card>
    );
  };
  
  export default ProductCardAdmin;
  