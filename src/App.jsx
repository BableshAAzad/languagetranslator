import Translator from './components/Translator'
import "./App.css"
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'

function App() {
  let [progress, setProgress] = useState(0)
  return (
    <>
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/translator' element={<Translator />}></Route>
        </Routes>
      </BrowserRouter> */}
        <LoadingBar height={3} color='#FFFFFF' progress={progress} />
      <Translator setProgress={setProgress} />
    </>
  )
}

export default App
