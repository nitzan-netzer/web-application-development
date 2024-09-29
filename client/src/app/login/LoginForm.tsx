"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/srcstyles/loginRegister.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import SubmitButton from "@/srccomponents/SubmitButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/srcvalidations/Login.validation";
import { useFormState } from "react-dom";
import { signIn } from "@/srcactions/auth";

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginValidation),
    mode: "onChange",
    disabled: false,
    reValidateMode: "onChange",
  });

  const initialState = {
    message: "",
    errors,
    fieldValues: {
      email: "",
      password: "",
    },
  };

  const [formState, formAction] = useFormState(signIn, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!!formState.message) {
      console.log("Success");
      formRef.current?.reset();
    }
  }, [formState]);

  useEffect(() => {
    if (!!formState.message) {
      alert(formState.message);
    }
  });

  return (
    <div className={styles.wrapper}>
      <form ref={formRef} action={formAction}>
        <h1>Login</h1>
        <div className={styles.inputBox}>
          <input type="Email" placeholder="Email" required />
          <FaUser className={styles.icon} />
        </div>

        <p>
          {formState.errors?.["email"]}
          {errors["email"] && errors["email"]?.message}
        </p>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Password" required />
          <FaLock className={styles.icon} />
        </div>

        <p>
          {formState.errors?.["password"]}
          {errors["password"] && errors["password"]?.message}
        </p>

        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password</a>
        </div>

        {/* <button type='submit' className='mybtn'>Login</button> */}

        <SubmitButton text="Submit" className="btn" />

        <div className={styles.registerLink}>
          <p>
            Don't have an account?
            <Link href="/register">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
