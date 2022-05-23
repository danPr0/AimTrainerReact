import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "./input";
import renewAccessToken from "../authentication/renewAccessToken";
import axios from "axios";

export default function ChangePasswordForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    const [passwordsMismatch, setPasswordsMismatch] = useState("");
    const navigate = useNavigate();

    return (
        <Formik initialValues={{oldPassword: "", newPassword: "", newPasswordConfirm: ""}}
                validationSchema={getValidationSchema()}
                validate={values => setPasswordsMismatch((values.newPassword !== values.newPasswordConfirm) ? "Passwords mismatch" : "")}
                onSubmit={values => sendInput(values)}
        >
            {formik => (
                <Form>
                    <div className="mb-0 mt-3 px-0 py-2">
                        <Input
                            label="Old password"
                            name="oldPassword"
                            type="password"
                            placeholder="Enter old password"
                        />
                        <Input
                            label="New password"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                        />
                        <Input
                            label="New Password Confirm"
                            name="newPasswordConfirm"
                            type="password"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <div className="text-danger">{passwordsMismatch}</div>
                    <div className="text-danger">{declinedRequestMessage}</div>

                    <button disabled={!formik.isValid || passwordsMismatch !== ""} type="submit"
                            className={!formik.isValid || passwordsMismatch !== "" ? "btn btn-primary disabled w-100 py-1 px-5 my-1"
                                : "btn btn-primary w-100 py-1 px-5 my-1"}> OK
                    </button>

                    <div style={{textAlign: "center"}} aria-disabled={declinedRequestMessage !== ""}>
                        <small>
                            <a href={"/reset-password"}> Forgot password? </a>
                        </small>
                    </div>
                </Form>
            )}
        </Formik>
    );

    function getValidationSchema() {
        return Yup.object({
            oldPassword: Yup.string()
                .min(8, "Must be 8-20 characters")
                .max(20, "Must be 8-20 characters")
                .required("Required"),
            newPassword: Yup.string()
                .min(8, "Must be 8-20 characters")
                .max(20, "Must be 8-20 characters")
                .required("Required"),
            newPasswordConfirm: Yup.string()
                .min(8, "Must be 8-20 characters")
                .max(20, "Must be 8-20 characters")
                .required("Required")
        })
    }

    function sendInput(values) {
        axios
            .post("auth/change-password", values)
            .then(() => navigate("/"))
            .catch(error => handleError(error.response, values))
    }

    function handleError(error, values) {
        if (error.status === 400)
            setDeclinedRequestMessage(error.data)
        else {
            renewAccessToken().then(ifSuccessful => {
                if (ifSuccessful)
                    sendInput(values);
                else navigate("/login");
            })
        }
    }
}