'use client';


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Filters, { FiltersState } from './UsersFilters';
import UserCard from './UsersCard';
import App from 'next/app';

interface User {
    username: string;
    rule: string;
    id: string;
}


interface UsersCardProps {
    user: User;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
}

const UsersPage: React.FC = () => {

    //Test Data
    const UsersTest: User[] = [
        { username: 'john_doe', rule: 'seller', id: '1' },
        { username: 'jane_smith', rule: 'buyer', id: '2' },
        { username: 'alice_jones', rule: 'seller', id: '3' },
    ];

    const [users, setUsers] = useState<User[]>(UsersTest);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(UsersTest);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [updatedUser, setUpdatedUser] = useState<User | null>(null);

    const deleteUsers = async (user: User) => {
        if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
            setUsers(users.filter((u) => u.id != user.id));
            setFilteredUsers(filteredUsers.filter((u) => u.id != user.id));
            alert(`${user.username} deleted successfully`);
        }
    };

    const handleEditUserClick = (user: User) => {
        setCurrentUser(user);
        setUpdatedUser(user);
        setShowEditModal(true);
    };

    const applyFilters = (filters: FiltersState) => {
        let filtered = [...users];

        if (filters.username) {
            filtered = filtered.filter((u) => u.username.toLowerCase().includes(filters.username.toLowerCase()));
        }

        if (filters.rule) {
            filtered = filtered.filter((u) => u.rule === filters.rule);
        }

        if (filters.queryType === 'and') {
            setFilteredUsers(filtered);
        } else if (filters.queryType === 'or') {
            setFilteredUsers(
                users.filter((user) =>
                    user.username.toLowerCase() === (filters.username.toLowerCase()) ||
                    user.rule.toLowerCase() === filters.rule.toLowerCase())
            );
        }
    }

    return (
        <Container>
            <h1 className="mt-4">ניהול משתמשים</h1>
            <Filters applyFilters={applyFilters} />

            <Row>
                {filteredUsers.map((user) => (
                    <Col sm={6} md={4} key={user.id}>
                        <UserCard user={user} deleteUser={deleteUsers} editUser={editUser} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UsersPage;
