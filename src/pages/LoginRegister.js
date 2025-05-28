import React, { useState } from "react";
import LoginForm from "../components/LoginFrom";
import RegisterForm from "../components/RegisterForm";
import { Box, Typography, Button } from "@mui/material";

function Login(){
     const [showRegister, setShowRegister] = useState(false);

    return(
        <Box style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
            <Box sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "#f5f5f5"}}>
                {showRegister ? (
                <>
                    <RegisterForm />
                    <Typography sx={{ mt: 2 , display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Already have an account?
                        <Button onClick={() => setShowRegister(false)} sx={{ ml: 1, boxShadow: 3 }}>
                            Login
                        </Button>
                    </Typography>
                </>
                ) : (
                <>
                    <LoginForm />
                    <Typography sx={{ mt: 2,  display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Don't have an account?
                        <Button onClick={() => setShowRegister(true)} sx={{ ml: 1, boxShadow: 3}}>
                            Register
                        </Button>
                    </Typography>
                </>
            )}
            </Box>
        </Box>
    );
}

export default Login;
