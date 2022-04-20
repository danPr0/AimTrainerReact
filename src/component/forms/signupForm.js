import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import {Formik, Form} from "formik";
import * as Yup from "yup";
import "../../bootstrap.css";
import Input from "./input";
import axios from "axios";

export default function SignupForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    const [passwordsMismatch, setPasswordsMismatch] = useState("");
    let navigate = useNavigate();

    return (
        <Formik initialValues={{username: "", email: "", password: "", passwordConfirm: ""}}

                validationSchema={
                    Yup.object({
                        username: Yup.string()
                            .min(4, "Must be 4-25 characters")
                            .max(25, "Must be 4-25 characters")
                            .required("Required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Required"),
                        password: Yup.string()
                            .min(8, "Must be 8-20 characters")
                            .max(20, "Must be 8-20 characters")
                            .required("Required"),
                        passwordConfirm: Yup.string()
                            .required("Required")
                    })}

                validate={values => {
                    if (values.password !== values.passwordConfirm)
                        setPasswordsMismatch("Passwords mismatch")
                    else setPasswordsMismatch("");
                }}

                onSubmit={values =>
                    axios
                        .post("auth/signup", values)
                        .then((response) => {
                            if (response.status === 200) {
                                navigate("/login");
                            } else setDeclinedRequestMessage(response.data);
                        })
                        .catch((error) => {
                            console.log(error.toJSON());
                        })
                }
        >
            {formik => (
                <Form>
                    <div className="mb-0 mt-3 px-0 py-2">
                        <Input
                            label="Nickname"
                            name="username"
                            type="text"
                            placeholder="Enter nickname"
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                        />

                        <Input
                            label="Password confirm"
                            name="passwordConfirm"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div className="text-danger">{passwordsMismatch}</div>
                    <div className="text-danger">{declinedRequestMessage}</div>

                    <button disabled={!formik.isValid || passwordsMismatch !== ""} type="submit"
                            className={!formik.isValid || passwordsMismatch !== ""
                                ? "btn btn-primary disabled w-100 my-2" :"btn btn-primary w-100 my-2"}> Sign up </button>
                </Form>
            )}
        </Formik>
    );
}
