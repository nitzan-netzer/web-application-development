'use client';

import Form from '@/srccomponents/Form';
import React from 'react'
import { LoginValidation } from '@/srcvalidations/Login.validation';
import { login } from '@/srcactions/auth';

const inputs = [
    {
        name: 'email',
        label: 'Email',
        type: 'text',
        required: true,
        placeholder: 'Enter your email address'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Enter your password'
    }
]

const form = {
    name: 'login',
    title: 'Login',
    inputs,
    schema: LoginValidation,
    serverAction: login
}


function LoginForm() {
  return (
    <Form {...form} />
  )
}

export default LoginForm