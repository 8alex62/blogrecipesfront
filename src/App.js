import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"
import Recipes from './pages/Recipes';
import NavBar from './components/ResponsiveNavBar'
import CreateRecipes from './pages/CreateRecipe'
import CreateIngredients from './pages/CreateIngredients'
import LoginRegister from './pages/LoginRegister'
import RecipeDetails from './pages/RecipeDetails';

function App() {
   return (
    <div className='app'>
      
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={LoginRegister}/>
          <Route path='/recipes' Component={Recipes} />
          <Route path='/CreateRecipe' Component={CreateRecipes} />
          <Route path='/CreateIngredients' Component={CreateIngredients} />
          <Route path='/recipes/:id' Component={RecipeDetails} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;