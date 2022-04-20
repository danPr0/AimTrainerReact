import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "./input";
import renewAccessToken from "../authentication/renewAccessToken";
import {useCookies} from "react-cookie";
import axios from "axios";

export default function ChangePasswordForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    const [passwordsMismatch, setPasswordsMismatch] = useState("");
    const [, setCookie] = useCookies();
    const navigate = useNavigate();

    function sendRequest(values) {
        axios
            .post("auth/change-password", values)
            .then((response) => {
                console.log(response.data);
                setCookie("accessToken", response.data, {httpOnly: true});
                navigate("/welcome");
            })
            .catch((error) => {
                console.log(error.toJSON());
                if (error.response.status === 401) {
                    renewAccessToken();
                    if (localStorage.getItem("authenticated")) {
                        console.log("sfkskdfsdksklflsdfksk")
                        sendRequest(values);
                    }
                    else navigate("/login");
                }
                else setDeclinedRequestMessage(error.response.data);
            })
    }

    return (
        <Formik initialValues={{oldPassword: "", newPassword: "", newPasswordConfirm: ""}}

                validationSchema={Yup.object({
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
                })}

                validate={values => {
                    if (values.newPassword !== values.newPasswordConfirm)
                        setPasswordsMismatch("Passwords mismatch")
                    else setPasswordsMismatch("");
                }}

                onSubmit={values => sendRequest(values)}
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
}