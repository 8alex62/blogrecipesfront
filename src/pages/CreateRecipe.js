import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, TextField, Button, Select, MenuItem,
  InputLabel, FormControl, Typography, IconButton
} from '@mui/material';
import { RemoveCircle, AddCircle } from '@mui/icons-material';

function MonFormulaire() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    urlImage: '',
    categorieId: '',
    membreId: localStorage.getItem("userId") || '',
    ingredientsUsed: []
  });

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios("http://localhost:8090/Category/")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Erreur chargement catégories", err));

    axios("http://localhost:8090/Ingredient/")
      .then((res) => setIngredients(res.data.data))
      .catch((err) => console.error("Erreur chargement ingrédients", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredientsUsed];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredientsUsed: updated }));
  };

  const addIngredientLine = () => {
    setFormData((prev) => ({
      ...prev,
      ingredientsUsed: [...prev.ingredientsUsed, {
        ingredientId: '',
        quantity: '',
        unit: ''
      }]
    }));
  };

  const removeIngredientLine = (index) => {
    const updated = [...formData.ingredientsUsed];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, ingredientsUsed: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.urlImage)) {
      alert('Lien invalide');
      return;
    }

    try {
      const recipePayload = {
        title: formData.titre,
        description: formData.description,
        picture: formData.urlImage,
        Category: formData.categorieId,
        Member: formData.membreId
      };
<<<<<<< Updated upstream

      const recipeRes = await axios.post("http://localhost:8090/Recipe/", recipePayload);
      const recipeId = recipeRes.data.data._id;

      const ingredientPosts = formData.ingredientsUsed.map((item) => ({
        quantity: Number(item.quantity),
        unit: item.unit,
        Recipe: recipeId,
        Ingredient: item.ingredientId
      }));

      await Promise.all(
        ingredientPosts.map((data) =>
          axios.post("http://localhost:8090/IngredientRecipe/", data)
        )
      );

      alert("Recette et ingrédients ajoutés avec succès !");
      setFormData({
        titre: '',
        description: '',
        urlImage: '',
        categorieId: '',
        membreId: localStorage.getItem("userId") || '',
        ingredientsUsed: []
      });

=======
      console.log("Payload envoyé à /Recipe :", recipePayload);
      const recipeRes = await axios.post("http://localhost:8090/Recipe/", recipePayload);
      const recipeId = recipeRes.data.data._id;

      const ingredientPosts = formData.ingredientsUsed.map((item) => ({
        quantity: Number(item.quantity),
        unit: item.unit,
        Recipe: recipeId,
        Ingredient: item.ingredientId
      }));

      await Promise.all(
        ingredientPosts.map((data) =>
          axios.post("http://localhost:8090/IngredientRecipe/", data)
        )
      );

      alert("Recette et ingrédients ajoutés avec succès !");
      setFormData({
        titre: '',
        description: '',
        urlImage: '',
        categorieId: '',
        membreId: localStorage.getItem("userId") || '',
        ingredientsUsed: []
      });

>>>>>>> Stashed changes
    } catch (err) {
      console.error("Erreur lors de la soumission :", err);
      alert("Erreur lors de la création de la recette.");
    }
  };

  return (
    <Box sx={{height:'100vh', display:'flex',justifyContent: "center", alignItems: "center"}}>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, backgroundColor: "White" ,border: '1px solid #ccc', borderRadius: 3 }}
    >
      <Typography variant="h5" mb={2}>Créer une recette</Typography>

      <TextField
        label="Nom de la recette"
        name="titre"
        value={formData.titre}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        label="URL Image"
        name="urlImage"
        value={formData.urlImage}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required
        error={formData.urlImage && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.urlImage)}
        helperText={!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.urlImage) && formData.urlImage ? "URL invalide" : ""}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Catégorie</InputLabel>
        <Select
          variant='outlined'
          label="Catégorie"
          name="categorieId"
          value={formData.categorieId}
          onChange={handleChange}
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" mt={2}>Ingrédients</Typography>
      {formData.ingredientsUsed.map((ing, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <FormControl sx={{ flex: 2 }}>
            <InputLabel>Ingrédient</InputLabel>
            <Select
              variant='outlined'
              label="Ingrédient"
              value={ing.ingredientId}
              onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}
              required
            >
              {ingredients.map((i) => (
                <MenuItem key={i._id} value={i._id}>{i.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantité"
            value={ing.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            required
            sx={{ flex: 1 }}
          />

          <TextField
            label="Unité"
            value={ing.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            required
            sx={{ flex: 1 }}
          />

          <IconButton onClick={() => removeIngredientLine(index)} color="error">
            <RemoveCircle />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddCircle />}
        onClick={addIngredientLine}
        sx={{ mb: 2 }}
      >
        Ajouter un ingrédient
      </Button>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Envoyer
      </Button>
    </Box>
    </Box>
  );
}

export default MonFormulaire;
