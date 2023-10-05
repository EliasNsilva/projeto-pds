import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Problems from './pages/Problems'
import StudyTrack from './pages/StudyTrack'
import Login from './pages/LoginPage'
import Content from './pages/Content'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<Home />} />
        <Route path="/studytrack" element={<StudyTrack />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </Router>
  )
}

export default App
