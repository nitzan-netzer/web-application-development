import React from 'react'
import GenericLoginForm from './GenericLoginForm'
import { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata ={
    title: '2nd Leg | Login',
}

function LoginPage() {
  return (
    // <GenericLoginForm/>
    <LoginForm/>
  )
}

export default LoginPage