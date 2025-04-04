// src/components/SpecialtySelector.tsx
import { useState } from 'react'

const specialties = [
  { id: 1, name: 'Medicina General' },
  { id: 2, name: 'Examen Odontológico' }
]

export default function SpecialtySelector({ onSelect }: { onSelect: (specialty: string) => void }) {
  const [selected, setSelected] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSelect(selected)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Seleccione especialidad</h2>
      <div className="grid grid-cols-2 gap-4">
        {specialties.map((spec) => (
          <button
            key={spec.id}
            type="button"
            className={`p-4 rounded ${selected === spec.name 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setSelected(spec.name)}
          >
            {spec.name}
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={!selected}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        Buscar Citas
      </button>
    </form>
  )
}