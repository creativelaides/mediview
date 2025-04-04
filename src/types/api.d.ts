// src/types/api.d.ts

/* Tipos para solicitudes API */
export interface LoginRequest {
  identifier: string
  dateOfBirth: string
}

export interface CreateAppointmentRequest {
  appointmentDate: string
  specialty: string
  doctorId: string
}

export interface ReserveAppointmentRequest {
  appointmentId: string
}

/* Tipos para respuestas API */
export interface LoginResponse {
  token: string
  fullName: string
  identifier: string
}

export interface AppointmentResponse {
  id: string
  appointmentDate: string
  specialty: string
  status: 'Available' | 'Reserved' | 'Completed' | 'Cancelled'
  doctorId: string
  doctorName: string
  doctorSpecialization: string
  patientId?: string
}

export interface PatientDetailsResponse {
  id: string
  firstName: string
  lastName: string
  identifier: string
  email: string
  dateOfBirth: string
  phoneNumber: string
  appointments: AppointmentResponse[]
}

export interface DoctorResponse {
  id: string
  firstName: string
  lastName: string
  specialization: string
  medicalCenter: string
  availableSlots: string[]
  email: string
  phoneNumber: string
}

export interface SpecialtyOption {
  value: string
  label: string
}

/* Tipos para errores API */
export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
  code?: string
  timestamp?: string
  path?: string
}

/* Tipos utilitarios */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

declare global {
  interface Date {
    toLocalISOString(): string
  }
}

// Extensión corregida de Axios
declare module 'axios' {
  export interface AxiosRequestConfig {
    errorHandling?: boolean
    retry?: boolean
  }

  export interface AxiosResponse {
    metadata?: Record<string, unknown>
  }
}