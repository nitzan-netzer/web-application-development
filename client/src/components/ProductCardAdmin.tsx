'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';

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

interface ProductCardProps {
  product: Product;
  handleDelete: (product: Product) => void;
  handleUpdate: (product: Product) => void;
}

const ProductCardAdmin: React.FC<ProductCardProps> = ({ product, handleDelete, handleUpdate }) => {
  return (
    <Card className="mb-4" dir="rtl">
      {product.image && <Card.Img variant="top" src={product.image} style={{ width: '295px', height: '200px' }} />}
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
        <Button variant="primary" className="mt-2" onClick={() => handleUpdate(product)}>
          ערוך מוצר
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCardAdmin;
