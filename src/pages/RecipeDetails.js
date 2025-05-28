import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails(){
    const { id } = useParams();
    const [member, setMember] = useState();
    const [recipe, setRecipe] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8090/Recipe/${id}`)
            .then((res) => {
                setRecipe(res.data.data);
                setMember(res.data.data.Member)
                console.log(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
            });
    }, [id]);
    return(
        <Box sx={{minHeight: "100vh", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Card sx={{
                    backgroundColor: "white", 
                    padding: 2, 
                    margin: 2,
                    display:"inline"}}>
                <img src={recipe?.picture} alt={recipe?.title} style={{height: 'auto' }}/>
                <Typography variant="h2" component="h1" gutterBottom>
                    {recipe?.title}
                </Typography>
                <Typography variant="body1" component="p">
                    {recipe?.description}
                </Typography>
                <Typography variant="body2" component="p">
                    <strong>Shared by: {member?.firstName} {member?.lastName}</strong>
                </Typography>
            </Card>  
        </Box>
    );
}

export default RecipeDetails;