import React from "react";

function CreateRecipe(){
    return(
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="text" name="recipeName" placeholder="Entrez le nom de votre recette"/>
            <input type="text" name="nom" placeholder="Entrez votre nom"/>
            <input type="file" id="image" name="image" accept="image/*"/>
            <button type="submit">Envoyer</button>
        </form>
    );
}

export default CreateRecipe;