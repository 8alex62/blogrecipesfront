import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import NavBar from './components/ResponsiveNavBar'
import CreateRecipes from './pages/CreateRecipe'
import CreateIngredients from './pages/CreateIngredients'
import LoginRegister from './pages/LoginRegister'

function App() {
   return (
    <div className='app'>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={LoginRegister}/>
          <Route path='/Home' Component={Home} />
          <Route path='/CreateRecipe' Component={CreateRecipes} />
          <Route path='/CreateIngredients' Component={CreateIngredients} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;