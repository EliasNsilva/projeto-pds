import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
// Rotas
import Home from './pages/Home'
import HuxleyRun from './pages/HuxleyRun'
import HuxleySubmit from './pages/HuxleySubmit'

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

      </Routes>
    </Router>
  )
}

export default App
