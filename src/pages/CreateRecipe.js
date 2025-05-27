import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MonFormulaire() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    urlImage: '',
    categorieId: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios("http://localhost:8090/Category/")
      .then((res) => {
        setCategories(res.data.data);
        console.log("Catégories chargées :", res.data.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des catégories ", error);
      });
  }, []);

  // Validation URL simple
  const isValidUrl = (url) =>
    /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(url);

  // Gestion du changement des inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(formData.urlImage)) {
      alert('Lien invalide');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8090/Category/", formData);
      console.log("Catégorie ajoutée :", response.data);
      alert("Catégorie créée avec succès !");

      // Optionnel : réinitialiser le formulaire
      setFormData({
        titre: '',
        description: '',
        urlImage: '',
        categorieId: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur lors de l'envoi de la catégorie.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulaire">
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
          <option key="default" value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" >Envoyer</button>
    </form>
  );
}

export default MonFormulaire;
