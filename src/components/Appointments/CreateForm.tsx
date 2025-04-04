// src/components/Appointments/CreateForm.tsx
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAppointment } from '../../api/appointments'
import DoctorSelector from './DoctorSelector'
import { toast } from 'react-hot-toast'
import type { CreateAppointmentRequest } from '../../types/api'

export default function CreateForm() {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<CreateAppointmentRequest>({
    appointmentDate: '',
    specialty: 'Medicina General',
    doctorId: ''
  })

  const mutation = useMutation({
    mutationFn: (data: CreateAppointmentRequest) =>
      createAppointment({
        ...data,
        appointmentDate: new Date(data.appointmentDate).toISOString()
      }),
    onSuccess: () => {
      toast.success('Cita creada exitosamente!')
      // Corrección clave: Uso correcto de invalidateQueries
      queryClient.invalidateQueries({
        queryKey: ['appointments'] // Formato correcto para v4+
      })
      setFormData({
        appointmentDate: '',
        specialty: 'Medicina General',
        doctorId: ''
      })
    },
    onError: (error: Error) => {
      toast.error(`Error al crear cita: ${error.message}`)
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.doctorId) {
      toast.error('Seleccione un doctor')
      return
    }

    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block mb-2">Fecha y Hora:</label>
        <input
          type="datetime-local"
          className="w-full p-2 border rounded"
          required
          value={formData.appointmentDate}
          onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
          min={new Date().toISOString().slice(0, 16)}
        />
      </div>

      <div>
        <label className="block mb-2">Especialidad:</label>
        <select
          className="w-full p-2 border rounded"
          value={formData.specialty}
          onChange={(e) => setFormData({
            ...formData,
            specialty: e.target.value,
            doctorId: ''
          })}
        >
          <option value="Medicina General">Medicina General</option>
          <option value="Odontología">Odontología</option>
        </select>
      </div>

      <DoctorSelector
        specialty={formData.specialty}
        selectedDoctor={formData.doctorId}
        onSelect={(doctorId) => setFormData({ ...formData, doctorId })}
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {mutation.isPending ? 'Creando...' : 'Crear Cita'}
      </button>
    </form>
  )
}