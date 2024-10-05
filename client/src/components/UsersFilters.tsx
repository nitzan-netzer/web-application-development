'use client';

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface FiltersProps {
    applyFilters: (filters: FiltersState) => void;
  }

  export interface FiltersState {
    username: string;
    name: string;
    gender: string;
    minbirthyaer: number;
    maxbirthyaer: number;
    isSeller: boolean;
    isAdmin: boolean;
    queryType: 'and' | 'or';
  }

  const Filters: React.FC<FiltersProps> = ({ applyFilters }) => {
    const [filters, setFilters] = useState<FiltersState>({
      username: '',
      name: '',
      gender: '',
      minbirthyaer: 0,
      maxbirthyaer: 0,
      isSeller: false,
      isAdmin: false,
      queryType: 'and',
    });

    const handleInputChange = (e: React.ChangeEvent<FormControlElement>) => {
        const target = e.target;
        const { name, value } = target;
        if (target instanceof HTMLInputElement && target.type === 'checkbox') {
          const { checked } = target;
          setFilters((prev) => ({
            ...prev,
            [name]: checked,
          }));
        } else {
          setFilters((prev) => ({
            ...prev,
            [name]: value,
          }));
        }
      };

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters(filters);
      };

      return (
        <Form onSubmit={handleSubmit} className="mb-4" dir="rtl">
          <Row>
            {/* Username Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="usernameFilter">
                <Form.Label>שם משתמש</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={filters.username}
                  onChange={handleInputChange}
                  placeholder="חפש לפי שם משתמש"
                />
              </Form.Group>
            </Col>

            {/* Name Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="nameFilter">
                <Form.Label>שם</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleInputChange}
                  placeholder="חפש לפי שם"
                />
              </Form.Group>
            </Col>

            {/* Gender Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="genderFilter">
                <Form.Label>מין</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={filters.gender}
                  onChange={handleInputChange}
                >
                  <option value="">בחר מין</option>
                  <option value="male">זכר</option>
                  <option value="female">נקבה</option>
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Min Birth Year Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="minBirthYearFilter">
                <Form.Label>שנת לידה מינימלית</Form.Label>
                <Form.Control
                  type="number"
                  name="minbirthyaer"
                  value={filters.minbirthyaer}
                  onChange={handleInputChange}
                  placeholder="שנת לידה מינימלית"
                />
              </Form.Group>
            </Col>

            {/* Max Birth Year Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="maxBirthYearFilter">
                <Form.Label>שנת לידה מקסימלית</Form.Label>
                <Form.Control
                  type="number"
                  name="maxbirthyaer"
                  value={filters.maxbirthyaer}
                  onChange={handleInputChange}
                  placeholder="שנת לידה מקסימלית"
                />
              </Form.Group>
            </Col>

            {/* Is Seller Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="isSellerFilter">
                <Form.Check
                  type="checkbox"
                  name="isSeller"
                  checked={filters.isSeller}
                  onChange={handleInputChange}
                  label="האם מוכר"
                />
              </Form.Group>
            </Col>

            {/* Is Admin Filter */}
            <Col md={4} className="mb-3">
              <Form.Group controlId="isAdminFilter">
                <Form.Check
                  type="checkbox"
                  name="isAdmin"
                  checked={filters.isAdmin}
                  onChange={handleInputChange}
                  label="האם מנהל"
                />
              </Form.Group>
            </Col>

            {/* Query Type Filter */}
            <Col md={4} className="mb-3">
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

          {/* Apply Filters Button */}
          <Row>
            <Col md={3} className="mb-3">
              <Button variant="primary" type="submit">
                החל חיפוש
              </Button>
            </Col>
          </Row>
        </Form>
      );
    };
    
    export default Filters;
