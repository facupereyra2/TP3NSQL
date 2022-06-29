import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Buscar from './components/Buscar';
import Home from "./components/Home";
import Cargar from './components/Cargar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/buscar' element={<Buscar/>}/>
          <Route path='/cargar' element={<Cargar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
