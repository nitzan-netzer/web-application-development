"use client";

import React, { useEffect, useRef } from "react";
import styles from "@/srcstyles/loginRegister.module.css";
import SubmitButton from "@/srccomponents/SubmitButton";
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterValidation } from "@/srcvalidations/Register.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/src/actions/auth";
import { useFormState } from "react-dom";
import { FaHome, FaUser } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { BsGenderAmbiguous } from "react-icons/bs";

function RegisterForm() {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterValidation),
    mode: "onChange",
    disabled: false,
    reValidateMode: "onChange",
  });

  const initialState = {
    message: "",
    errors,
    fieldValues: {
      username: "",
      name: "",
      email: "",
      address: "",
      gender: "",
      password: "",
      passwordConfirmation: "",
      isSeller: false,
    },
  };

  const [formState, formAction] = useFormState(signUp, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!!formState.message) {
      console.log("Success");
      formRef.current?.reset();
    }
  }, [formState]);

  useEffect(() => {
    if (!!formState.message) {
      // alert(formState.message);
      console.log("Success");
    }
  }, [formState]);

  return (
    <div className={styles.wrapper}>
      <form ref={formRef} action={formAction}>
        <h1>Register</h1>

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter Username"
            {...register("username")}
          />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <MdEmail className={styles.icon} />
        </div>

        <p>
          {formState.errors?.["email"]}
          {errors["email"] && errors["email"]?.message}
        </p>

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Enter your address"
            {...register("address")}
          />
          <FaHome className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <Form.Select aria-placeholder="Gender" {...register("gender")}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </div>

        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <TbPassword className={styles.icon} />
        </div>

        <p>
          {formState.errors?.["password"]}
          {errors["password"] && errors["password"]?.message}
        </p>

        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="password confirmation"
            {...register("passwordConfirmation")}
          />
          <TbPassword className={styles.icon} />
        </div>

        <p>
          {formState.errors?.["passwordConfirmation"]}
          {errors["passwordConfirmation"] &&
            errors["passwordConfirmation"]?.message}
        </p>

        <div >
          <Form.Check type='checkbox' label="Are you a seller?" {...register("isSeller")}/>
        </div>

        <SubmitButton text="Submit" className="btn m-3" />

        <div className={styles.registerLink}>
          <p>
            Already have an account?
            <Link href="/login">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
