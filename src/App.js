import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';

function App() {
   return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
