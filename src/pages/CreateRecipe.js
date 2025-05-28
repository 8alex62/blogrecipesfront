import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MonFormulaire() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    urlImage: '',
    categorieId: '',
    membreId: '', 
    ingredientsUsed: []
  });

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [membres, setMembres] = useState([]);

  // Charger catégories, ingrédients et membres
  useEffect(() => {
    axios("http://localhost:8090/Category/")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error("Erreur chargement catégories", err));

    axios("http://localhost:8090/Ingredient/")
      .then((res) => setIngredients(res.data.data))
      .catch((err) => console.error("Erreur chargement ingrédients", err));

    axios("http://localhost:8090/Member/all")
  .then((res) => {
    console.log("Membres reçus :", res.data);
    console.log("Membres reçus :", res.data.data);
    setMembres(res.data.data);
  })
  .catch((err) => console.error("Erreur chargement membres", err));
  }, []);

  const isValidUrl = (url) =>
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(url);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...formData.ingredientsUsed];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      ingredientsUsed: updated
    }));
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
    setFormData((prev) => ({
      ...prev,
      ingredientsUsed: updated
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isValidUrl(formData.urlImage)) {
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

    const recipeRes = await axios.post("http://localhost:8090/Recipe/", recipePayload);
    console.log("Réponse création recette :", recipeRes.data);
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
      membreId: '',
      ingredientsUsed: []
    });

  } catch (err) {
    console.error("Erreur lors de la soumission :", err);
    alert("Erreur lors de la création de la recette.");
  }
};

  return (
    <form onSubmit={handleSubmit} className="formulaire">
      <h2>Créer une recette</h2>

      <div>
        <label>Nom de la recette :</label>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description :</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>URL Image :</label>
        <input
          type="url"
          name="urlImage"
          value={formData.urlImage}
          onChange={handleChange}
          required
        />
        {!isValidUrl(formData.urlImage) && formData.urlImage && (
          <p style={{ color: 'red' }}>URL invalide</p>
        )}
      </div>

      <div>
        <label>Catégorie :</label>
        <select
          name="categorieId"
          value={formData.categorieId}
          onChange={handleChange}
          required
        >
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      
      <div>
        <label>Membre (ID) :</label>
        <select
          name="membreId"
          value={formData.membreId}
          onChange={handleChange}
          required
        >
          <option value="">-- Choisir un membre --</option>
          {membres.map((m) => (
            <option key={m._id} value={m._id}>
              {m.firstName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Ingrédients :</label>
        {formData.ingredientsUsed.map((ing, index) => (
          <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <select
              value={ing.ingredientId}
              onChange={(e) => handleIngredientChange(index, 'ingredientId', e.target.value)}
              required
            >
              <option value="">-- Choisir un ingrédient --</option>
              {ingredients.map((i) => (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Quantité"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Unité"
              value={ing.unit}
              onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              required
            />

            <button type="button" onClick={() => removeIngredientLine(index)}>−</button>
          </div>
        ))}
        <button type="button" onClick={addIngredientLine}>+ Ajouter un ingrédient</button>
      </div>

      <button type="submit" style={{ marginTop: '20px' }}>Envoyer</button>
    </form>
  );
}

export default MonFormulaire;
