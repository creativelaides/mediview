import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

interface AppointmentDetails {
  id: string
  date: string
  doctor: string
  specialty: string
}

export default function Confirmation() {
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null)

  useEffect(() => {
    const fetchLastAppointment = async () => {
      try {
        const response = await api.get('/appointments/last')
        setAppointment(response.data)
      } catch (error) {
        alert('Error al cargar detalles de la cita')
        navigate('/appointments')
      }
    }

    fetchLastAppointment()
  }, [navigate])

  if (!appointment) return <div>Cargando detalles...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">¡Reserva Exitosa!</h1>
        
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Especialidad:</label>
            <p className="text-gray-600">{appointment.specialty}</p>
          </div>
          
          <div>
            <label className="font-semibold">Fecha y Hora:</label>
            <p className="text-gray-600">
              {new Date(appointment.date).toLocaleString()}
            </p>
          </div>
          
          <div>
            <label className="font-semibold">Profesional:</label>
            <p className="text-gray-600">{appointment.doctor}</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/appointments')}
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Volver a citas
        </button>
      </div>
    </div>
  )
}