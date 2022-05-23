import axios from "axios";

export default async function RenewAccessToken() {
     await axios
        .post("auth/renew-access-token")
        .catch(() => {})
     return document.cookie.indexOf("accessTokenClone=") !== -1;
}