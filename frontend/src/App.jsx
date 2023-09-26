import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
// Rotas
import Home from './pages/Home'
import HuxleyRun from './pages/HuxleyRun'
import HuxleySubmit from './pages/HuxleySubmit'
import Problems from './pages/Problems' // Importa o componente Problemas
import StudyTrack from './pages/StudyTrack' // importa o componente tRILHA DE estudos


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":id" element={<Home />} />
        </Route>

        <Route path="/run" element={<HuxleyRun />} />
        <Route path="/submit" element={<HuxleySubmit />} />

        {/*
        Exemplo de rotas para quem nunca usou React Router antes
        <Route path="login" element={<Login />} />
        <Route path="products" element={<Products />}>
          <Route path="search" element={<Search />} />
          <Route path="list" element={<ListProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path=":id" element={<ProductDisplay />} />
        </Route> 
        */}
        <Route path="/problems" element={<Problems />} />
        <Route path="/studytrack" element={<StudyTrack/>} />
      </Routes>
    </Router>
  )
}

export default App
