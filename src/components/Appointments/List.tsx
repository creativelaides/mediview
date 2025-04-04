import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAvailableAppointments, reserveAppointment, cancelAppointment } from '../../api/appointments'
import { toast } from 'react-hot-toast'

export default function AppointmentList({ specialty }: { specialty: string }) {
  const queryClient = useQueryClient()

  const { data: appointments = [], isLoading } = useQuery(
    ['appointments', specialty],
    () => getAvailableAppointments(specialty)
  )

  const reserveMutation = useMutation(reserveAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments'])
      toast.success('Cita reservada con éxito!')
    },
    onError: () => toast.error('Error al reservar cita')
  })

  const cancelMutation = useMutation(cancelAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments'])
      toast.success('Cita cancelada!')
    },
    onError: () => toast.error('Error al cancelar cita')
  })

  if (isLoading) return <div className="text-center p-4">Cargando citas...</div>

  return (
    <div className="space-y-4">
      {appointments.map(appointment => (
        <div key={appointment.id} className="p-4 border rounded-lg shadow-sm bg-white">
          {/* ... resto del componente ... */}
          <button
            onClick={() => reserveMutation.mutate(appointment.id)}
            disabled={reserveMutation.isLoading}
            className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm disabled:bg-gray-400"
          >
            {reserveMutation.isLoading ? 'Reservando...' : 'Reservar'}
          </button>
        </div>
      ))}
    </div>
  )
}