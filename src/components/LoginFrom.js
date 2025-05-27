import React from "react";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormControl, Button, Input, OutlinedInput, InputAdornment, IconButton} from "@mui/material";
import {Visibility, AccountCircle, Lock, VisibilityOff, Router} from '@mui/icons-material';

function LoginForm(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

     const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8090/auth/login", {
            email,
            password,
            });
            navigate("/Home");
            console.log("Login success:", response.data);
        } catch (err) {
            setError("Invalid credentials");
            console.error("Login error:", err);
        }
    };

    return(
        <FormControl component="form" onSubmit={handleLogin}>
                <OutlinedInput
                    placeholder="Email"
                    sx={{ borderRadius: 4, background: "white", m: 1 }}
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                />
                <Input
                    sx={{ borderRadius: 4, background: "white", m: 1}}
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    startAdornment={
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    }
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
            <Button variant="contained" sx={{ m: 1, }} type="submit">Connect</Button>
             {error && <div style={{ color: "red", marginLeft: 8 }}>{error}</div>}
        </FormControl>
    );
}

export default LoginForm