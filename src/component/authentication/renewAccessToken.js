import axios from "axios";

export default function RenewAccessToken() {
    axios
        .post("auth/renew-access-token")
        .then(() => localStorage.setItem("authenticated", "true"))
        .catch(() => {
            localStorage.setItem("authenticated", "");
            localStorage.removeItem("authenticated");
        })
}