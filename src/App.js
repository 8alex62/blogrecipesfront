import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Recipes from './pages/Recipes';
import NavBar from './components/ResponsiveNavBar';
import CreateRecipes from './pages/CreateRecipe';
import CreateIngredients from './pages/CreateIngredients';
import LoginRegister from './pages/LoginRegister';
import RecipeDetails from './pages/RecipeDetails';

function AppContent() {
  const location = useLocation();

  const showNavBar = location.pathname !== '/';

  return (
    <div className='app'>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path='/' Component={LoginRegister} />
        <Route path='/recipes' Component={Recipes} />
        <Route path='/CreateRecipe' Component={CreateRecipes} />
        <Route path='/CreateIngredients' Component={CreateIngredients} />
        <Route path='/recipes/:id' Component={RecipeDetails} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
