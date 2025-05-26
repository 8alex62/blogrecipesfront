import { useState, useEffect } from "react";
import RecipeCard from "../components/CardRecipes";
import axios from "axios";

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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          title={recipe.title}
          description={recipe.description}
          picture={recipe.picture}
        />
      ))}
    </div>
  );
}
export default Home