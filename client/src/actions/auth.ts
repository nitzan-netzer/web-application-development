'use server';

import { RegisterValidation } from "@/srcvalidations/Register.validation";
import { LoginValidation } from "@/srcvalidations/Login.validation";
import { ZodError } from "zod";

export async function login(prevState:any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');


    try {
        LoginValidation.parse({email, password});

        prevState = {
            message: 'Success',
            errors: undefined,
            fieldValues: {
                email: '',
                password: ''
            }
        }

        return prevState;
        
    } catch (error) {
        const zodError = error as ZodError;
        const errorMap = zodError.flatten().fieldErrors;

        prevState = {
            message: '',
            errors: {
                name: errorMap['name']?.[0] ?? '',
                email: errorMap['email']?.[0] ?? '',
            },
            fieldValues: {
                email,
                password
            }
        }

        return prevState;
    }
}

export async function register(prevState:any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        prevState.errors = {
            confirmPassword: 'Passwords do not match'
        }
        return prevState;
    }

    try {
        RegisterValidation.parse({email, password});

        prevState = {
            message: 'Success',
            errors: undefined,
            fieldValues: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }

        return prevState;
        
    } catch (error) {
        const zodError = error as ZodError;
        const errorMap = zodError.flatten().fieldErrors;

        prevState = {
            message: '',
            errors: {
                name: errorMap['name']?.[0] ?? '',
                email: errorMap['email']?.[0] ?? '',
            },
            fieldValues: {
                email,
                password,
                confirmPassword
            }
        }

        return prevState;
    }
}
