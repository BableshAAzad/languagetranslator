import React from 'react'
import Translator from './components/Translator'
import "./App.css"
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/translator' element={<Translator />}></Route>
        </Routes>
      </BrowserRouter> */}
      <Translator />
    </>
  )
}

export default App
