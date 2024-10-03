"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/srcstyles/loginRegister.module.css";
import { FaUser, FaLock } from "react-icons/fa";
import SubmitButton from "@/srccomponents/SubmitButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/srcvalidations/Login.validation";
import { useFormState } from "react-dom";
import { login } from "@/srcactions/auth";
import Toast from "react-bootstrap/Toast";
import { ToastContainer } from "react-bootstrap";

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

  const [formState, formAction] = useFormState(login, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!!formState.message && formState.message === "Success") {
      console.log("Success");
      formRef.current?.reset();
    }
  }, [formState]);

  const [showToast, setShowToast] = useState(false);
  
  return (
    <div>
      <div className={styles.wrapper}>
        <form ref={formRef} action={formAction}>
          <h1>Login</h1>
          <div className={styles.inputBox}>
            <input
              type="Email"
              placeholder="Email"
              required
              {...register("email")}
            />
            <FaUser className={styles.icon} />
          </div>

          <p>
            {formState.errors?.["email"]}
            {errors["email"] && errors["email"]?.message}
          </p>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              required
              {...register("password")}
            />
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

          <SubmitButton
            text="Submit"
            className="btn"
            onClick={() => setShowToast(true)}
          />

          <div className={styles.registerLink}>
            <p>
              Don't have an account?
              <Link href="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>

      
      <ToastContainer position="bottom-end" style={{ zIndex: 1 }}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Body>{formState?.message && formState.message}</Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  );
}

export default LoginForm;
