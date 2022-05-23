import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function Oauth2LoginResponse() {
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("auth/if-authenticated")
            .then(() => {
                localStorage.setItem("authentication", "oauth");
                localStorage.setItem("username", new URL(window.location.href).searchParams.get("username"));
                navigate("/");
            })
            .catch(() => navigate("/login"))
    });

    return null;
}