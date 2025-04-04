// src/pages/PatientProfilePage.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'
import type { PatientDetailsResponse } from '../types/api'

export default function PatientProfilePage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [patientData, setPatientData] = useState<PatientDetailsResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const { data } = await api.get<PatientDetailsResponse>(`/patients/${user?.identifier}`)
                setPatientData(data)
            } catch (err) {
                setError('Error al cargar el perfil del paciente')
            } finally {
                setLoading(false)
            }
        }

        if (user?.identifier) {
            fetchPatientData()
        }
    }, [user?.identifier])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-4 text-red-500 text-center">
                {error}
                <button
                    onClick={() => window.location.reload()}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Perfil del Paciente</h1>
                <button
                    onClick={() => navigate('/appointments')}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Volver a Citas
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <ProfileField label="Nombre Completo" value={patientData?.fullName} />
                    <ProfileField label="Documento de Identidad" value={patientData?.identifier} />
                    <ProfileField label="Correo Electrónico" value={patientData?.email} />
                </div>

                <div className="space-y-4">
                    <ProfileField label="Fecha de Nacimiento" value={patientData?.dateOfBirth} />
                    <ProfileField label="Teléfono" value={patientData?.phoneNumber} />
                    <ProfileField
                        label="Citas Programadas"
                        value={patientData?.appointments.length.toString()}
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => navigate('/edit-profile')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Editar Perfil
                </button>
            </div>
        </div>
    )
}

function ProfileField({ label, value }: { label: string; value?: string | number }) {
    return (
        <div className="border-b border-gray-200 pb-2">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-lg text-gray-900">{value || 'No especificado'}</dd>
        </div>
    )
}