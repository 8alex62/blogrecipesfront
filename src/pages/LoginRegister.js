import React from "react";
import LoginForm from "../components/LoginFrom";

function Login(){
    return(
        <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
                <LoginForm/>
        </div>
    );
}

export default Login;
