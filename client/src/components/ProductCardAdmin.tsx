'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';

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


interface ProductCardProps {
  product: Product;
  handleDelete: (product: Product) => void;
}

const ProductCardAdmin: React.FC<ProductCardProps> = ({ product, handleDelete }) => {
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
          <strong>כמות במלאי: </strong> {product.quantity}
        </Card.Text>
        <Button variant="danger" onClick={() => handleDelete(product)}>
          מחק מוצר מהמאגר
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCardAdmin;
