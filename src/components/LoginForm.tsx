import { useState } from 'react'
import api from '../api/client'

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    identifier: '',
    dateOfBirth: ''
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login', {
        identifier: credentials.identifier,
        dateOfBirth: credentials.dateOfBirth
      })
      
      localStorage.setItem('mediview_token', response.data.token)
      window.location.href = '/appointments'
    } catch (error) {
      alert('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Documento de identidad"
        className="w-full p-2 border rounded"
        onChange={(e) => setCredentials({...credentials, identifier: e.target.value})}
      />
      <input
        type="date"
        className="w-full p-2 border rounded"
        onChange={(e) => setCredentials({...credentials, dateOfBirth: e.target.value})}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Ingresar
      </button>
    </form>
  )
}