import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/Auth/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirigir si ya está autenticado
    if (localStorage.getItem('mediview_token')) {
      navigate('/appointments')
    }
  }, [navigate])

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Bienvenido a MediView
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingrese sus datos para acceder al sistema
          </p>
        </div>
        
        <LoginForm />

        <div className="text-center text-sm text-gray-500">
          ¿Problemas para ingresar?{' '}
          <button 
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={() => alert('Contactar al administrador')}
          >
            Contactar soporte
          </button>
        </div>
      </div>
    </div>
  )
}