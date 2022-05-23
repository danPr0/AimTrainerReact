export default function ConfirmPasswordReset() {
    return (
        <div className="container-fluid px-3 py-5 bg-black" style={{color: "white", height: "100vh"}}>
            <p>
                Please check out your email account to confirm password resetting!<br/>
                Then you'll be able to <a href="http://localhost:3000/login">login</a> with the new password
            </p>
        </div>
    );
}