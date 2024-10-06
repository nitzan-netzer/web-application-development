'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import Filters, { FiltersState } from './UsersFilters';
import UserCard from './UsersCard';
import { deleteUser, blockUser, unblockUser } from "@/srcapi/nitApi";

interface User {
    username: string;
    name: string;
    email: string;
    password: string;
    birthyear: number;
    address: string;
    gender: string;
    isSeller: boolean;
    isAdmin: boolean;
    isBlocked: boolean;
    salt: string;
    userId: string;
}

interface UsersCardProps {
    allUsers: User[];
}

const UsersPage: React.FC<UsersCardProps> = ({ allUsers }) => {


    const [users, setUsers] = useState<User[]>(allUsers);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(allUsers);

    const deleteUsers = async (user: User) => {
        if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
            await deleteUser(user.userId);

            setUsers(users.filter((u) => u.userId !== user.userId));
            setFilteredUsers(filteredUsers.filter((u) => u.userId !== user.userId));
            alert(`${user.username} deleted successfully`);
        }
    };

    const blockUsers = async (user: User) => {
        if (window.confirm(`Are you sure you want to block ${user.username}?`)) {
            await blockUser(user.userId);

            setUsers(users.map((u) => u.userId === user.userId ? { ...u, isBlocked: true } : u));
            setFilteredUsers(filteredUsers.map((u) => u.userId === user.userId ? { ...u, isBlocked: true } : u));
            alert(`${user.username} blocked successfully`);
        }
    };

    const unblockUsers = async (user: User) => {
        if (window.confirm(`Are you sure you want to unblock ${user.username}?`)) {
            await unblockUser(user.userId);

            setUsers(users.map((u) => u.userId === user.userId ? { ...u, isBlocked: false } : u));
            setFilteredUsers(filteredUsers.map((u) => u.userId === user.userId ? { ...u, isBlocked: false } : u));
            alert(`${user.username} unblocked successfully`);
        }
    };

    const applyFilters = (filters: FiltersState) => {
        console.log('Applying Filters:', filters);
        const { username, name, gender, minbirthyaer, maxbirthyaer, isSeller, isAdmin, queryType } = filters;
        let filtered = users;

        const minbirthyaerFilter = minbirthyaer ? (minbirthyaer) : null;
        const maxbirthyaerFilter = maxbirthyaer ? (maxbirthyaer) : null;

        if (username || name || gender || minbirthyaer || maxbirthyaer || isSeller || isAdmin) {
            if (queryType === 'and') {
                filtered = users.filter((user) => {
                    const usernameMatch = username
                        ? user.username.toLowerCase() === username.toLowerCase()
                        : true;
                    const nameMatch = name
                        ? user.name.toLowerCase().includes(name.toLowerCase())
                        : true;
                    const genderMatch = gender
                        ? user.gender.toLowerCase() === gender.toLowerCase()
                        : true;
                    const minbirthyaerMatch = minbirthyaer !== null ? user.birthyear >= minbirthyaer : true;
                    const maxbirthyaerMatch = maxbirthyaer !== null ? user.birthyear <= maxbirthyaer : true;
                    const isSellerMatch = isSeller ? user.isSeller === isSeller : true;
                    const isAdminMatch = isAdmin ? user.isAdmin === isAdmin : true;

                    return (
                        usernameMatch &&
                        nameMatch &&
                        genderMatch &&
                        minbirthyaerMatch &&
                        maxbirthyaerMatch &&
                        isSellerMatch &&
                        isAdminMatch
                    );
                });
            } else if (queryType === 'or') {
                filtered = users.filter((user) => {
                    const usernameMatch = username
                        ? user.username.toLowerCase() === username.toLowerCase()
                        : false;
                    const nameMatch = name
                        ? user.name.toLowerCase().includes(name.toLowerCase())
                        : false;
                    const genderMatch = gender
                        ? user.gender.toLowerCase() === gender.toLowerCase()
                        : false;
                    const minbirthyaerMatch = minbirthyaer !== null ? user.birthyear >= minbirthyaer : false;
                    const maxbirthyaerMatch = maxbirthyaer !== null ? user.birthyear <= maxbirthyaer : false;
                    const isSellerMatch = isSeller ? user.isSeller === isSeller : false;
                    const isAdminMatch = isAdmin ? user.isAdmin === isAdmin : false;

                    return (
                        usernameMatch ||
                        nameMatch ||
                        genderMatch ||
                        minbirthyaerMatch ||
                        maxbirthyaerMatch ||
                        isSellerMatch ||
                        isAdminMatch
                    );
                });
            }
        }

        setFilteredUsers(filtered);
    };

    return (
        <Container>
            <h1 className="mt-4">ניהול משתמשים</h1>
            <Filters applyFilters={applyFilters} />

            <Row>
                {filteredUsers.map((user) => (
                    <Col sm={6} md={4} key={user.userId}>
                        <UserCard user={user} deleteUser={deleteUsers} blockUser={blockUsers} unblockUser={unblockUsers} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UsersPage;
