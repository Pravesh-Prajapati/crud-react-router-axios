import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Editdata from './components/Editdata';
import Showdata from './components/Showdata';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Form/>}  />
      <Route path='/showdata' element={<Showdata/>}/>
      <Route path='/editdata/:id' element={<Editdata/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
