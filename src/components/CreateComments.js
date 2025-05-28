import { Box, Button, FormControl, Rating, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


function CreateComments({Recipe}) {
    const userId = localStorage.getItem("userId");
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();
    const [note, setNote] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8090/Member/${userId}`)
            .then((res) => {
                setAuthor(res.data.data.firstName + " " + res.data.data.lastName);
            })
            .catch((error) => {
                console.error("Error fetching member details:", error);
            });

    }, [userId]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8090/Comment/", {
                author,
                content,
                note,
                Recipe
            })
            .then((res) => {
                console.log("Comment created successfully:", res.data);
                setContent("");
                setNote(0);
            })
        } catch (error) {
            console.log("Error creating comment:", error);
        }
    }


    return(
        <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Box sx={{display:"flex", justifyContent:"flex-end"}}>
                <Rating  value={note || 0}  onChange={(e) => setNote(e.target.value)} defaultValue={0} size="large" precision={0.5} />
            </Box>
            <TextField multiline variant="outlined" value={content || ""} label="Content" onChange={e => setContent(e.target.value)} rows={4} sx={{ m: 1, borderRadius: 5, boxShadow: 4, background: "white", '& .MuiOutlinedInput-root': {borderRadius: 5,}}}/>
            
            <Button type="submit" variant="contained" color="primary" sx={{ m: 1, borderRadius: 5, boxShadow: 4 }}>
                Post Comment   
            </Button>    
        </FormControl>
    );
}

export default CreateComments;