'use client';

import Form from '@/srccomponents/Form'
import React from 'react'
import { RegisterValidation } from '@/srcvalidations/Register.validation'
import { register } from '@/srcactions/auth';

const inputs = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address'
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        placeholder: 'Enter your password'
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        required: true,
        placeholder: 'Confirm your password'
    }
]

const form = {
    name: 'register',
    title: 'Register',
    inputs,
    schema: RegisterValidation,
    serverAction: register
}

function RegistrationForm() {
  return (
    <Form {...form} />
  )
}

export default RegistrationForm