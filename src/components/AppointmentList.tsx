import { useEffect, useState } from 'react'
import api from '../api/client'

interface Appointment {
  id: string
  date: string
  doctor: string
  specialty: string
}

export default function AppointmentList({ specialty }: { specialty: string }) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/appointments/available', {
          params: { specialty }
        })
        setAppointments(response.data)
      } catch (error) {
        alert('Error al cargar citas')
      } finally {
        setLoading(false)
      }
    }
    
    fetchAppointments()
  }, [specialty])

  const handleReserve = async (appointmentId: string) => {
    try {
      await api.post('/appointments/reserve', { appointmentId })
      alert('Cita reservada exitosamente!')
      window.location.href = '/confirmation'
    } catch (error) {
      alert('Error al reservar cita')
    }
  }

  if (loading) return <div>Cargando citas disponibles...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Citas Disponibles</h2>
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{new Date(appointment.date).toLocaleString()}</p>
                <p className="text-gray-600">{appointment.doctor}</p>
              </div>
              <button
                onClick={() => handleReserve(appointment.id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Reservar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}