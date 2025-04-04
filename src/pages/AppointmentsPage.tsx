import { useState } from 'react'
import AppointmentList from '../components/Appointments/List'
import CreateForm from '../components/Appointments/CreateForm'

export default function AppointmentsPage() {
  const [specialty, setSpecialty] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gestión de Citas</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showCreateForm ? 'Ver Citas' : 'Nueva Cita'}
        </button>
      </div>

      {showCreateForm ? (
        <CreateForm />
      ) : (
        <>
          {!specialty ? (
            <div className="space-y-2">
              <button 
                onClick={() => setSpecialty('Medicina General')}
                className="w-full p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Medicina General
              </button>
              <button
                onClick={() => setSpecialty('Examen Odontológico')}
                className="w-full p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Examen Odontológico
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => setSpecialty('')}
                className="mb-4 text-blue-500 hover:text-blue-600"
              >
                ← Volver
              </button>
              <AppointmentList specialty={specialty} />
            </>
          )}
        </>
      )}
    </div>
  )
}