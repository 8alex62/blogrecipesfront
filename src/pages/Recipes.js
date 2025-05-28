import { useState, useEffect } from "react";
import RecipeCard from "../components/CardRecipes";
import axios from "axios";
import { Box } from "@mui/material";

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
    <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
        />
      ))}
    </Box>
  );
}
export default Recipes