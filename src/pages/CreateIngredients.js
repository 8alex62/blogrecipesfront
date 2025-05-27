import React, { useState } from 'react';
import axios from 'axios';

function IngredientForm() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Le nom de l'ingrédient est requis.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8090/Ingredient/', {
        name: name.trim()
      });

      console.log('Ingrédient ajouté :', response.data);
      alert("Ingrédient ajouté avec succès !");
      setName(''); // Réinitialiser le champ
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'ingrédient :", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ingredient-form">
      <label >Nom de l'ingrédient :</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleChange}
        required
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default IngredientForm;
