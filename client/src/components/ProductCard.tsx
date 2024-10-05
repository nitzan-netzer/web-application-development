'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface Product {
  location : object;
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

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <Card className="mb-4" dir="rtl">
      {product.image && <Card.Img variant="top" src={product.image} style={{ width: '295px', height: '200px' }}/>}
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong>מחיר:</strong> {product.price}
        </Card.Text>
        <Card.Text>
          <strong>כמות במלאי: </strong> {product.quantity}
        </Card.Text>
        <Button variant="success" onClick={() => addToCart(product)}>
          הוספה לסל
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
