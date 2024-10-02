'use client';

import React from 'react';
import { Accordion, Button } from 'react-bootstrap';

interface User {
    name: string;
    position: string;
    id: string;
}


interface UsersCardProps {
    user: User;
    deleteUser: (user: User) => void;
    editUser: (user: User) => void;
}

const UserCard: React.FC<UsersCardProps> = ({ user, deleteUser, editUser }) => {
    return (

        <div className="UsersCard" dir="rtl">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{user.name}</Accordion.Header>
                    <Accordion.Body>
                        <p><b>Position:</b> {user.position}</p>
                        <p><b>id:</b> {user.id}</p>
                        <Button variant="primary" onClick={() => editUser(user)}>Edit</Button>
                        <Button variant="danger" onClick={() => deleteUser(user)}>Delete</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default UserCard;
