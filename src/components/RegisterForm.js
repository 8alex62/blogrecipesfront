import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControl, Button, TextField, OutlinedInput, InputAdornment, IconButton, Box, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function RegisterForm() {
    const [showPassword, setShowPassword] = React.useState(false);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [error, setError] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
    
        const navigate = useNavigate();
        const handleClickShowPassword = () => setShowPassword((show) => !show);
    
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
    
        const handleMouseUpPassword = (event) => {
            event.preventDefault();
        };
    const handleRegister = async (e) => {
         e.preventDefault();
        try {
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            } else if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            } 

                await axios.post("http://localhost:8090/Member/register", {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                navigate("/recipes");

           

        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <FormControl component="form" onSubmit={handleRegister}>
            <TextField
                label="First Name"
                variant="outlined"
                required={true}
                sx={{ m: 1, borderRadius: 5, boxShadow: 4,  background: "white", '& .MuiOutlinedInput-root': {borderRadius: 5,}}}
                onChange={e => setFirstName(e.target.value)}
            />
            
             <TextField
                label="Last Name"
                required={true}
                variant="outlined"
                sx={{ m: 1, borderRadius: 5, boxShadow: 4,  background: "white", '& .MuiOutlinedInput-root': {borderRadius: 5,}}}
                onChange={e => setLastName(e.target.value)}
            />

           <TextField
                label="Email"
                type="email"
                variant="outlined"
                required={true}
                sx={{ m: 1, borderRadius: 5, boxShadow: 4,  background: "white", '& .MuiOutlinedInput-root': {borderRadius: 5,}}}
                onChange={e => setEmail(e.target.value)}
            />

            <FormControl sx={{ m : 1}}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    sx={{ borderRadius: 5, boxShadow: 4,  background: "white", '& .MuiOutlinedInput-root': {borderRadius: 5}}}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    required={true}
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
             <FormControl sx={{ m : 1}}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                    id='confirmPassword'
                    sx={{ borderRadius: 5, boxShadow: 4,  background: "white", '& .MuiOutlinedInput-root': {borderRadius: 5,}}}
                    onChange={e => setConfirmPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    required={true}
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
             <Button variant="contained" sx={{ m: 1, borderRadius: 5, boxShadow: 4}} type="submit">Create</Button>
                {error && <Box style={{ color: "red", marginLeft: 8 }}>{error}</Box>}
        </FormControl>
    );
}

export default RegisterForm;