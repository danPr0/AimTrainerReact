import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import renewAccessToken from "../authentication/renewAccessToken";

export default function ProtectedRoute({children}) {
    const navigate = useNavigate();
    let [render, setRender] =
        useState(localStorage.getItem("authenticated") ? children : null);

    useEffect(() => {
        console.log("dlkfjlsfjklsdfjsdflsjlfsdfjl")

        if (!localStorage.getItem("authenticated")) {
            renewAccessToken();
            if (!localStorage.getItem("authenticated"))
                navigate("/login");
            else setRender(children);
        }
    }, [navigate, children])

    return render;
}