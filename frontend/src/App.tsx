import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<About />} />
          <Route path="servicos" element={<Services />} />
          <Route path="contato" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
