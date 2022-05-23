import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "./input";
import renewAccessToken from "../authentication/renewAccessToken";
import axios from "axios";

export default function ChangeNicknameForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    let navigate = useNavigate();

    return (
        <Formik initialValues={{newUsername: ""}}
                validationSchema={getValidationSchema()}
                onSubmit={values => sendInput(values)}
        >
            {formik => (
                <Form>
                    <div className="mb-0 mt-3 px-0 py-2">
                        <Input
                            label="New nickname"
                            name="newUsername"
                            type="text"
                            placeholder="Enter new nickname"
                        />
                    </div>

                    <div className="text-danger">{declinedRequestMessage}</div>

                    <button disabled={!formik.isValid} type="submit"
                            className={!formik.isValid ? "btn btn-primary disabled w-100 py-1 px-5 my-1"
                                : "btn btn-primary w-100 py-1 px-5 my-1"}> OK
                    </button>
                </Form>
            )}
        </Formik>
    );

    function getValidationSchema() {
        return Yup.object({
            newUsername: Yup.string()
                .min(4, "Must be 4-25 characters")
                .max(25, "Must be 4-25 characters")
                .required("Required")
        })
    }

    function sendInput(values) {
        axios
            .post("auth/change-username-for-oauth", values)
            .then(() => {
                localStorage.setItem("username", values.newUsername);
                renewAccessToken().then(ifSuccessful => navigate(ifSuccessful ? "/" : "/login"))
            })
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
