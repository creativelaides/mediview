// src/api/appointments.ts
import api from './client'
import type {
  CreateAppointmentRequest,
  AppointmentResponse
} from '../types/api'

export const getAvailableAppointments = (specialty: string) => 
  api.get<AppointmentResponse[]>('/appointments/available', { params: { specialty } })

export const reserveAppointment = (appointmentId: string) => 
  api.post(`/appointments/${appointmentId}/reserve`)

// Función corregida para crear citas
export const createAppointment = (data: CreateAppointmentRequest) => 
  api.post<AppointmentResponse>('/appointments', {
    ...data,
    appointmentDate: new Date(data.appointmentDate).toISOString()
  })

export const cancelAppointment = (id: string) => 
  api.delete(`/appointments/${id}`)

export const getPatientAppointments = () =>
  api.get<AppointmentResponse[]>('/patients/me/appointments')