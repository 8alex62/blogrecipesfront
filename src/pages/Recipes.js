import { useState, useEffect } from "react";
import RecipeCard from "../components/CardRecipes";
import axios from "axios";
import { Box, Typography } from "@mui/material";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/Recipe/")
      .then((res) => {
        setRecipes(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>Toutes les recettes</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr"
          },
          gap: 3,
        }}
      >
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </Box>
    </Box>
  );
}

export default Recipes;
