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
    <div className={styles.wrapper} dir="rtl">
      <form ref={formRef} action={formAction}>
        <h1>הרשמה</h1>

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="הכנס שם משתמש"
            {...register("username")}
          />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="הכנס שם מלא"
            {...register("name")}
          />
          <FaUser className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="הכנס כתובת דואר אלקטורני"
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
            placeholder="הכנס כתובת (רחוב ומספר, עיר)"
            {...register("address")}
          />
          <FaHome className={styles.icon} />
        </div>

        <div className={styles.inputBox}>
          <Form.Select aria-placeholder="Gender" {...register("gender")}>
            <option value="">בחר מין</option>
            <option value="male">זכר</option>
            <option value="female">נקבה</option>
          </Form.Select>
        </div>

        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="הכנס סיסמא"
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
            placeholder="הכנס סיסמא שנית"
            {...register("passwordConfirmation")}
          />
          {/* <TbPassword className={styles.icon} /> */}
        </div>

        <p>
          {formState.errors?.["passwordConfirmation"]}
          {errors["passwordConfirmation"] &&
            errors["passwordConfirmation"]?.message}
        </p>

        <div>
          <Form.Check
            type="checkbox"
            label="מעוניין למכור באתר"
            {...register("isSeller")}
          />
        </div>

        <SubmitButton text="Submit" className="btn m-3" />

        <div className={styles.registerLink}>
          <p>יש לך כבר חשבון?</p>
          <Link href="/auth/login">לחץ כאן להתחברות</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
