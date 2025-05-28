import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe }) {

  const navigate = useNavigate();

  return (
    <Card 
      sx={{ MaxWidth: 100 }}
      onClick={() => 
      {
        navigate(`${recipe._id}`);
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="100"
          image={recipe.picture}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {recipe.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}