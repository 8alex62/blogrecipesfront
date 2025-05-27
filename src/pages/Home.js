import { useState, useEffect } from "react";
import RecipeCard from "../components/CardRecipes";
import axios from "axios";
import { Box } from "@mui/material";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios("http://localhost:8090/Recipe/")
      .then((res) => {
        setRecipes(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          title={recipe.title}
          description={recipe.description}
          picture={recipe.picture}
        />
      ))}
    </Box>
  );
}
export default Home