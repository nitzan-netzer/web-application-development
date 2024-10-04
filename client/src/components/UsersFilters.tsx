'use client';

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FiltersProps {
    applyFilters: (filters: FiltersState) => void;
  }

  export interface FiltersState {
    username: string;
    rule: string;
    queryType: 'and' | 'or';
  }

  const Filters: React.FC<FiltersProps> = ({ applyFilters }) => {
    const [filters, setFilters] = useState<FiltersState>({
      username: '',
      rule: '',
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
            <Col md={4}>
              <Form.Group controlId="nameFilter">
                <Form.Label>שם המשתמש</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={filters.username}
                  onChange={handleInputChange}
                  placeholder="חפש לפי שם משתמש"
                />
              </Form.Group>
            </Col>

            {/* Rule Filter */}
            <Col md={3}>
              <Form.Group controlId="ruleFilter">
                <Form.Label>מוכר/קונה</Form.Label>
                <Form.Control
                  type="number"
                  name="minPrice"
                  value={filters.rule}
                  onChange={handleInputChange}
                  placeholder="מוכר/קונה"
                />
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
        
            {/* Apply Filters Button */}
            <Col md={3}>
              <Button variant="primary" type="submit">
                החל חיפוש
              </Button>
            </Col>
          </Row>
        </Form>
      );
    };
    
    export default Filters;
    
