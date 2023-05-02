import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio/Inicio';
import Home from './components/home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import NewRecipe from './components/NewRecipe/NewRecipe';
import React from 'react';



function App() {


  return (
   <Routes>
    <Route path='/' element={<Inicio/>} />
    <Route path='/home' element={<Home/>} />
    <Route path='/recipes/:id' element={<RecipeDetail/>} />
    <Route path='/recipes/' element={<NewRecipe/>} />
   </Routes>
  );
}




export default App;
