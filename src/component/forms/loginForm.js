import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import {Formik, Form} from "formik";
import * as Yup from "yup";
import "../../bootstrap.css";
import Input from "./input";
import axios from "axios";

export default function LoginForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    let navigate = useNavigate();

    return (
        <Formik initialValues={{email: "", password: ""}}

                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    password: Yup.string()
                        .min(8, "Must be 8-20 characters")
                        .max(20, "Must be 8-20 characters")
                        .required("Required")
                })}

                onSubmit={values =>
                    axios
                        .post("auth/login", values)
                        .then(response => {
                            localStorage.setItem("username", response.data);
                            localStorage.setItem("authenticated", "true");
                            navigate("/welcome");
                        })
                        .catch((error) => {
                            console.log(error.toJSON());
                            console.log(error.response.data);
                            setDeclinedRequestMessage(error.response.data);
                        })
                }
        >
            {formik => (
                <Form>
                    <div className="mb-0 mt-3 px-0 py-2">
                        <Input
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter email"
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="text-danger">{declinedRequestMessage}</div>

                    <button disabled={!formik.isValid} type="submit"
                            className={!formik.isValid ? "btn btn-primary disabled w-100 py-1 px-5 my-1"
                                : "btn btn-primary w-100 py-1 px-5 my-1"}> Log in
                    </button>

                    <div style={{textAlign: "center"}} aria-disabled={declinedRequestMessage === ""}>
                        <small>
                            <a href={"/reset-password"}>
                                {(declinedRequestMessage) ? "Forgot your password?" : ""}
                            </a>
                        </small>
                    </div>
                </Form>
            )}
        </Formik>
    );
}