import { Metadata } from 'next'
import React from 'react'
import GenericRegisterForm from './GenericRegisterForm'
import RegisterForm from './RegisterForm'

export const metadata: Metadata ={
    title: '2nd Leg | Register',
}

function RegisterPage() {
  return (
    // <GenericRegisterForm/>
    <RegisterForm/>
  )
}

export default RegisterPage