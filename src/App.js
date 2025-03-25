import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Cookies from 'js-cookie'
import DashBoard from './components/DashBoard'
import Login from './components/Login'
import MapView from './components/MapView'

function App() {

  const ProtectedRoute = ({ children }) => {
    return Cookies.get('jwtToken') ? children : <Navigate to="/" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path="/map/:id" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
