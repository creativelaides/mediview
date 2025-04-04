interface Appointment {
  id: string
  date: string
  doctor: string
  specialty: string
  status: 'available' | 'reserved'
}

interface UserCredentials {
  identifier: string
  dateOfBirth: string
}