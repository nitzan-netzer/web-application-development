'use client';

import React, { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';

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
    user: User;
    deleteUser: (user: User) => void;
    blockUser : (user: User) => void;
    unblockUser : (user: User) => void;
}


const UserCard: React.FC<UsersCardProps> = ({ user, deleteUser, blockUser, unblockUser }) => {

    return (

        <div className="UsersCard" dir="rtl">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" style={{
                    backgroundColor: user.isBlocked ? '#e0e0e0' : '#fff', 
                    // pointerEvents: user.isBlocked ? 'none' : 'auto', 
                    // opacity: user.isBlocked ? 0.6 : 1, 
                }}>
                    <Accordion.Header>{user.username}</Accordion.Header>
                    <Accordion.Body>
                        <p><b>שם מלא:</b> {user.name}</p>
                        <p><b>מין:</b> {user.gender}</p>
                        <p><b>מייל:</b> {user.email}</p>
                        <p><b>שנת לידה:</b> {user.birthyear}</p>
                        <p><b>מזהה משתמש:</b> {user.userId}</p>
                        <Button variant="danger" onClick={() => deleteUser(user)}>מחק</Button>
                        <Button variant="Primary" onClick={() => blockUser(user)}>חסום</Button>
                        <Button variant="success" onClick={() => unblockUser(user)}>בטל חסימה</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default UserCard;
