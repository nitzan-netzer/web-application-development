'use client';

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FiltersProps {
  applyFilters: (filters: FiltersState) => void;
}

export interface FiltersState {
    category: string;
    name: string;
    minPrice: string;
    maxPrice: string;
    queryType: 'and' | 'or';
  }

const Filters: React.FC<FiltersProps> = ({ applyFilters }) => {
  const [filters, setFilters] = useState<FiltersState>({
    category: '',
    name: '',
    minPrice: '',
    maxPrice: '',
    queryType: 'and',
  }
  );

  const handleInputChange = (e: React.ChangeEvent<FormControlElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFilters((prev) => {
        const updatedFilters = { ...prev, [name]: value };
        return updatedFilters;
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(filters);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4" dir="rtl">
      <Row>
        {/* Name Filter */}
        <Col md={3}>
          <Form.Group controlId="nameFilter">
            <Form.Label>שם המוצר</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
              placeholder="חפש לפי שם"
            />
          </Form.Group>
        </Col>

        {/* Category Filter */}
        <Col md={3}>
          <Form.Group controlId="categoryFilter">
            <Form.Label>קטגוריה</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={filters.category}
              onChange={handleInputChange}
            >
              <option value="">כלל הקטגוריות</option>
              <option value="clothes">ביגוד ואופנה</option>
              <option value="Electronics">מוצרי חשמל</option>
              <option value="jewelry">תכשיטים</option>
              <option value="musical">מוזיקה</option>
              <option value="sport">אביזרי ספורט</option>
              <option value="toys">משחקים וצעצועים</option>
            </Form.Control>
          </Form.Group>
        </Col>

        {/* Query Type Filter */}
        <Col md={3}>
          <Form.Group controlId="queryType">
            <Form.Label>סוג חיפוש</Form.Label>
            <Form.Control
              as="select"
              name="queryType"
              value={filters.queryType}
              onChange={handleInputChange}
            >
              <option value="and">וגם</option>
              <option value="or">או</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mt-3">
        {/* Min Price Filter */}
        <Col md={3}>
          <Form.Group controlId="minPriceFilter">
            <Form.Label>מחיר מינימלי</Form.Label>
            <Form.Control
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="מחיר מינימלי"
            />
          </Form.Group>
        </Col>

        {/* Max Price Filter */}
        <Col md={3}>
          <Form.Group controlId="maxPriceFilter">
            <Form.Label>מחיר מקסימלי</Form.Label>
            <Form.Control
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="מחיר מקסימלי"
            />
          </Form.Group>
        </Col>

        {/* Apply Filters Button */}
        <Col md={3} className="d-flex align-items-end">
          <Button variant="primary" type="submit">
            החל חיפוש
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
