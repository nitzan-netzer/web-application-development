'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Button, Modal, Form } from 'react-bootstrap';
import Filters, { FiltersState } from './ProductsFilters';
import ProductCardAdmin from './ProductCardAdmin';
import { deleteProduct, updateProduct } from '@/srcapi/nitApi';

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

const ProductsPageAdmin: React.FC<Props> = ({ allProducts }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [updatedProduct, setUpdatedProduct] = useState<Partial<Product>>({});

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

  const handleDelete = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      const productId = product.productId;
      console.log('product ID : ', productId);
      try {
        await deleteProduct(productId);
        setProducts((prevProducts) => prevProducts.filter((p) => p.productId !== productId));
        alert(`${product.name} deleted successfully`);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again later.');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setUpdatedProduct(product); // Prefill the modal with the selected product details
    setShowEditModal(true);
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (selectedProduct) {
      try {
        const updatedProductData: Product = {
          ...selectedProduct,
          ...updatedProduct,
          location: selectedProduct.location, // Keep the existing location value
        };

        await updateProduct(selectedProduct.productId, updatedProductData);
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.productId === selectedProduct.productId ? updatedProductData : p
          )
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.map((p) =>
            p.productId === selectedProduct.productId ? updatedProductData : p
          )
        );
        alert(`${selectedProduct.name} updated successfully`);
        setShowEditModal(false);
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again later.');
      }
    }
  };

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
          const minPriceMatch = minPriceNum !== null ? product.price >= minPriceNum : false;
          const maxPriceMatch = maxPriceNum !== null ? product.price <= maxPriceNum : false;

          return categoryMatch || nameMatch || minPriceMatch || maxPriceMatch;
        });
      }
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container dir='rtl'>
      <h1 className="mt-4">ניהול מוצרים</h1>
      <section>
        כאן תוכלו לנהל את כלל המוצרים באתר מוזמנים לבצע חיפושים שונים כדי למצוא את המוצר שאתם מחפשים ולבצע את הפעולות הרצויות
      </section>
      <Filters applyFilters={applyFilters} />

      <div className="product-count" dir="rtl" style={{ marginBottom: '1rem' }}>
        <span>מספר מוצרים מוצגים: </span>
        <Badge bg="info">{filteredProducts.length}</Badge>
      </div>

      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.name} sm={12} md={6} lg={4}>
            <ProductCardAdmin
              product={product}
              handleDelete={handleDelete}
              handleUpdate={() => handleEdit(product)}
            />
          </Col>
        ))}
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ערוך מוצר</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>שם המוצר</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedProduct.name || ''}
                onChange={handleUpdateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>תיאור המוצר</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={updatedProduct.description || ''}
                onChange={handleUpdateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>מחיר</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedProduct.price || ''}
                onChange={handleUpdateChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productQuantity">
              <Form.Label>כמות</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={updatedProduct.quantity || ''}
                onChange={handleUpdateChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            שמור שינויים
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductsPageAdmin;
