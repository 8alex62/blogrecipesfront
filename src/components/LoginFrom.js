import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FormControl, Button, InputAdornment, IconButton, OutlinedInput} from "@mui/material";
import {Visibility, AccountCircle, Lock, VisibilityOff} from '@mui/icons-material';

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
            const response = await axios.post("http://localhost:8090/Member/login", {
            email,
            password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.member._id)
            
            navigate("/recipes");
            console.log("Login success:", response.data);
        } catch (err) {
            setError("Invalid credentials");
            console.error("Login error:", err);
        }
    };

    return(
        <FormControl component="form" onSubmit={handleLogin}>
            <FormControl sx={{ m : 1, boxShadow: 4, borderRadius: 4}}>
                <OutlinedInput
                    type="email"
                    required={true}
                    sx={{ borderRadius: 4, background: "white"}}
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                />
            </FormControl>
            <FormControl sx={{ m : 1, boxShadow: 4, borderRadius: 4}}>
                <OutlinedInput
                    sx={{ borderRadius: 4, background: "white"}}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    required={true}
                    placeholder="Password"
                    startAdornment={
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>}
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
                        </InputAdornment>}
                />
            </FormControl>
            <Button variant="contained" sx={{ m : 1, boxShadow: 4, borderRadius: 4}} type="submit">Connect</Button>
             {error && <div style={{ color: "red", marginLeft: 8 }}>{error}</div>}
        </FormControl>
    );
}

export default LoginForm