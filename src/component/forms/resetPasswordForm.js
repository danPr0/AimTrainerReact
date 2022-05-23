import {Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Input from "./input";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ResetPasswordForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    let navigate = useNavigate();

    return (
        <Formik initialValues={{email: ""}}
                validationSchema={getValidationSchema()}
                onSubmit={values => sendInput(values)}
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
    );

    function getValidationSchema(){
        return Yup.object({
            email: Yup.string()
                .required("Required")
                .email("Invalid email address")
        })
    }

    function sendInput(values) {
        axios
            .post(`/auth/reset-password?email=${values.email}`)
            .then(() => navigate("/confirm-password-reset"))
            .catch((error) => setDeclinedRequestMessage(error.response.data))
    }
}