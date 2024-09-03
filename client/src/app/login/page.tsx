import React from 'react'
import LoginForm from './LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata ={
    title: '2nd Leg | Login',
}

function LoginPage() {
  return (
    <LoginForm/>
  )
}

export default LoginPage