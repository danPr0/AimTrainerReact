import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Input from "./input";
import renewAccessToken from "../authentication/renewAccessToken";
import {useCookies} from "react-cookie";
import axios from "axios";

export default function ChangeNicknameForm() {
    const [declinedRequestMessage, setDeclinedRequestMessage] = useState("");
    const [, setCookie] = useCookies();
    const navigate = useNavigate();

    function sendRequest(values) {
        axios
            .post("auth/change-username", values)
            .then((response) => {
                console.log(response.data);
                setCookie("accessToken", response.data, {httpOnly: true});
                localStorage.setItem("username", values.newUsername);
                navigate("/welcome");
            })
            .catch((error) => {
                console.log(error.toJSON());
                if (error.response.status === 401) {
                    renewAccessToken();
                    if (localStorage.getItem("authenticated"))
                        sendRequest();
                    else navigate("/login");
                }
                else setDeclinedRequestMessage(error.response.data);
            })
    }

    return (
        <Formik initialValues={{newUsername: "", password: ""}}

                validationSchema={Yup.object({
                    newUsername: Yup.string()
                        .min(4, "Must be 4-25 characters")
                        .max(25, "Must be 4-25 characters")
                        .required("Required"),
                    password: Yup.string()
                        .min(8, "Must be 8-20 characters")
                        .max(20, "Must be 8-20 characters")
                        .required("Required")
                })}

                onSubmit={values => sendRequest(values)}
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
