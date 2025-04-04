import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirigir si ya está autenticado
    if (localStorage.getItem('mediview_token')) {
      navigate('/appointments')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">MediView Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}