import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Services from './pages/Services/Services'
import Contact from './pages/Contact/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard' // ADICIONE ESTA LINHA
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout/AdminLayout'
import CreateBanners from './pages/CreateBanners/CreateBanners'

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="servicos" element={<Services />} />
          <Route path="contato" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="cadastro" element={<Register />} />
        </Route>

        {/* Rotas protegidas */}
        <Route path="/painel-adm" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          {/* <Route path="criar-post" element={<CreatePost />} /> */}
          <Route path="banners" element={<CreateBanners />} />
          {/* <Route path="sobre" element={<EditAbout />} /> */}
          {/* <Route path="contato" element={<EditContactInfo />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App