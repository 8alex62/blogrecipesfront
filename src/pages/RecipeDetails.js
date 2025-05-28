
import { Box, Card, Typography } from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CreateComments from '../components/CreateComments';
import CommentCard from '../components/CommentCard';

function RecipeDetails(){
    const { id } = useParams();
    const [member, setMember] = useState();
    const [recipe, setRecipe] = useState();
    const [comments, setComments] =  useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8090/Recipe/${id}`)
            .then((res) => {
                setRecipe(res.data.data);
                setMember(res.data.data.Member)
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
            });

         axios.get(`http://localhost:8090/Comment/${id}`)
            .then((res) => {
                setComments(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching comment details:", error);
            });    
    }, [id]);

    return(
        <Box sx={{minHeight: "100vh", alignItems: "center", display: "flex", flexDirection: "column"}}>
            <Card sx={{
                    backgroundColor: "white", 
                    padding: 2, 
                    margin: 2,
                    display:"inline",
                    width: '1200px'}}>
                <Box sx={{
                    alignItems:"center",
                    display:"flex", 
                    flexDirection:"column",
                    border : '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 1,
                }} >
                    <img src={recipe?.picture} alt={recipe?.title}/>
                </Box>
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
            <Card sx={{
                    backgroundColor: "white", 
                    padding: 2, 
                    margin: 2,
                    display:"inline",
                    width: 1200}}>
                <Typography variant="h3" component="h2" gutterBottom>
                    Comments
                </Typography>

                <CreateComments Recipe = {recipe}/> 

                {comments.map((comment, index) => (
                        <CommentCard
                          key={index}
                          comment={comment}
                        />
                      ))}
            </Card>
        </Box>
    );
}

export default RecipeDetails;