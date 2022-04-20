import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import renewAccessToken from "../authentication/renewAccessToken";

export default function IfNotAuthenticated({children}) {
    const navigate = useNavigate();
    let [render, setRender] =
        useState(localStorage.getItem("authenticated") ? children : null);

    useEffect(() => {
        axios
            .get("auth/if-authenticated")
            .then(() => {
                localStorage.setItem("authenticated", "true");
                navigate("/welcome");
            })
            .catch(() => {
                renewAccessToken();
                if (!localStorage.getItem("authenticated"))
                    setRender(children);
            })
    }, [children, navigate]);

    return render;
}