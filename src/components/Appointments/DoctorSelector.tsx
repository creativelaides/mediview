// components/Appointments/DoctorSelector.tsx
import { useQuery } from '@tanstack/react-query'
import api from '../../api/client'

interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialization: string
  medicalCenter: string
}

interface DoctorSelectorProps {
  specialty: string
  selectedDoctor: string
  onSelect: (doctorId: string) => void
}

export default function DoctorSelector({
  specialty,
  selectedDoctor,
  onSelect
}: DoctorSelectorProps) {
  const { data: doctors = [], isLoading, isError } = useQuery<Doctor[]>({
    queryKey: ['doctors', specialty],
    queryFn: async () => {
      const { data } = await api.get<Doctor[]>(
        `/doctors/specialty/${encodeURIComponent(specialty)}`
      )
      return data
    },
    enabled: !!specialty,
    staleTime: 1000 * 60 * 5
  })

  if (!specialty) return null

  // Usar isLoading e isError en el renderizado
  if (isLoading) {
    return (
      <div className="p-2 text-gray-500 text-sm">
        Cargando lista de doctores...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-2 text-red-500 text-sm">
        Error al cargar los doctores disponibles
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block mb-2">Seleccione doctor:</label>
      <select
        value={selectedDoctor}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Seleccione un doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {`Dr. ${doctor.firstName} ${doctor.lastName}`}
          </option>
        ))}
      </select>
    </div>
  )
}