// src/components/LoginForm.tsx
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import api from '../api/client'
import type { LoginRequest, LoginResponse } from '../types/api'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const { mutate, isPending } = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) =>
      api.post('/auth/login', credentials).then(res => res.data),
    onSuccess: (response) => {
      localStorage.setItem('mediview_token', response.token)
      setUser({
        fullName: response.fullName,
        identifier: response.identifier,
        token: response.token
      })
      navigate('/appointments')
    },
    onError: (error) => {
      toast.error(error.message || 'Error de autenticación')
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const credentials: LoginRequest = {
      identifier: formData.get('identifier') as string,
      dateOfBirth: formData.get('dateOfBirth') as string
    }

    mutate(credentials)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Documento de Identidad
        </label>
        <input
          name="identifier"
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Nacimiento
        </label>
        <input
          name="dateOfBirth"
          type="date"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending ? 'Verificando...' : 'Ingresar'}
      </button>
    </form>
  )
}