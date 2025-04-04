import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Appointments from './pages/Appointments'
import Confirmation from './pages/Confirmation'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  )
}