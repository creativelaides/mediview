import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpecialtySelector from '../components/SpecialtySelector'
import AppointmentList from '../components/AppointmentList'

export default function Appointments() {
  const navigate = useNavigate()
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('')

  const handleLogout = () => {
    localStorage.removeItem('mediview_token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Reserva de Citas Médicas</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>

        {!selectedSpecialty ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SpecialtySelector onSelect={setSelectedSpecialty} />
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedSpecialty('')}
              className="text-blue-500 hover:text-blue-600"
            >
              ← Cambiar especialidad
            </button>
            <AppointmentList specialty={selectedSpecialty} />
          </div>
        )}
      </div>
    </div>
  )
}