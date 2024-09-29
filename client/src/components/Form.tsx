"use client";

import FormType from "@/srctypes/Form.type";
import React, { use, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";



function Form({ name, title, inputs, schema, serverAction, onSubmit }: FormType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    disabled: false,
    reValidateMode: "onChange",
  });

  const initialState = {
    message: "",
    errors,
    fieldValues: inputs.map((input) => {
      return {
        [input.name]: "",
      };
    }),
  };

  const [formState, formAction] = useFormState(serverAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!!formState.message) {
      console.log("Success");
      formRef.current?.reset();
      onSubmit && onSubmit({});
    }
  }, [formState]);

  useEffect(() => {
    if (!!formState.message) {
      alert(formState.message);
    }
  });
  

  return (
    <div className="wrapper">
      <form ref={formRef} action={formAction}>
        {title && <h1>{title}</h1>}
        {inputs &&
          inputs.map((input) => {
            switch (input.type) {
              case "select":
                return (
                  <div key={input.name}>
                    <label> {input.label} </label>
                    <div>
                      <select {...register(input.name)}>
                        {input.options?.map((option, index) => {
                          return (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <p>
                    {formState.errors?.[input.name]}
                    {errors[input.name] && errors[input.name]?.message}
                    </p>
                  </div>
                );
              default:
                return (
                  <div key={input.name}>
                    <label htmlFor={input.name}>{input.label}</label>

                    <div className="input-box">
                      <input
                        type={input.type}
                        {...register(input.name)}
                        placeholder={input.placeholder}
                        id={input.name}
                        disabled={input.disabled}
                      />
                    </div>

                    <p>
                    {formState.errors?.[input.name]}
                    {errors[input.name] && errors[input.name]?.message}
                    </p>
                  </div>
                );
            }
          })}
          <SubmitButton text="Submit" className="btn"/>
      </form>
    </div>
  );
}

export default Form;
