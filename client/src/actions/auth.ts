'use server';

import { RegisterValidation } from "@/srcvalidations/Register.validation";
import { LoginValidation } from "@/srcvalidations/Login.validation";
import { ZodError } from "zod";
import { redirect } from 'next/navigation';

export async function signIn(prevState:any, formData: FormData) {
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

export async function signUp(prevState:any, formData: FormData) {
    console.log(formData);
    const username = formData.get('username');
    const name = formData.get('name');
    const email = formData.get('email');
    const address = formData.get('address');
    const gender = formData.get('gender');
    const password = formData.get('password');
    const passwordConfirmation = formData.get('passwordConfirmation');
    const isSeller = false;
    const birthYear = 1990;


    console.log("before validation");
    if (password !== passwordConfirmation) {
        prevState.errors = {
            passwordConfirmation: 'Passwords do not match'
        }
        return prevState;
    }

    try {
        RegisterValidation.parse({email, password, passwordConfirmation});

        prevState = {
            message: 'Success',
            errors: undefined,
            fieldValues: {
                email: '',
                password: '',
                passwordConfirmation: ''
            }
        }

        const response = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                name,
                email,
                password,
                birthYear,
                address,
                gender,
                isSeller
            }),
            
        });
        const data = response.json();
        console.log("Data",data);
        console.log("after validation");
        return prevState;

        // redirect('/');
    } catch (error) {
        console.log(error);
        const zodError = error as ZodError;
        console.log(JSON.stringify(zodError));
        const errorMap = zodError.flatten().fieldErrors;
        // const errorMap = zodError.format();

        prevState = {
            message: '',
            errors: {
                email: errorMap['email']?.[0] ?? '',
                password: errorMap['password']?.[0] ?? '',
                passwordConfirmation: errorMap['passwordConfirmation']?.[0] ?? ''
            },
            fieldValues: {
                email,
                password,
                passwordConfirmation
            }
        }

        return prevState;
    }
}
