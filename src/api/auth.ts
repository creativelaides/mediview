// auth.ts (mejorado)
import api from './client'
import type { LoginRequest, LoginResponse, PatientDetailsResponse } from '../types/api'

export const login = (credentials: LoginRequest) => 
  api.post<LoginResponse>('/auth/login', credentials)

export const getPatientProfile = () => 
  api.get<PatientDetailsResponse>('/patients/me')