import { useState } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<div>"Muhammed"</div>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App