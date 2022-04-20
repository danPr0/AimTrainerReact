import React, {useState} from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Input from "../forms/input";

export default function ResetPassword() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    let navigate = useNavigate();

    return (
        <div className="container-fluid p-5 bg-black text-white">
            <div className="col-3">
                <h1>Reset password</h1>
                <Formik initialValues={{email: ""}}

                        validationSchema={Yup.object({
                            email: Yup.string()
                                .required("Required")
                                .email("Invalid email address")
                        })}

                        onSubmit={values => {
                            axios
                                .post("/auth/reset-password", values)
                                .then(() => {
                                    localStorage.removeItem("authenticated")
                                    navigate("/login");
                                })
                                .catch((error) => {
                                    console.log(error.toJSON);
                                    setDeclinedRequestMessage(error.response.data);
                                })
                        }}
                >
                    {formik => (
                        <Form>
                            <div className="mb-0 mt-3 px-0 py-2">
                                <Input
                                    label="Email"
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email"
                                />

                                <div className="text-danger">{declinedRequestMessage}</div>

                                <button disabled={!formik.isValid} type="submit"
                                        className={!formik.isValid
                                            ? "btn btn-primary disabled w-100 my-2" : "btn btn-primary w-100 my-2"}>
                                    Reset password
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}