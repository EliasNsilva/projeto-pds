import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
// Rotas
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <nav>
        <Header />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />

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
