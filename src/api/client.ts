import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5096/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('mediview_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

interface ApiError {
  message: string
  statusCode: number
}

// Función de manejo de errores global
api.interceptors.response.use(
  response => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.title || 'Error desconocido',
      statusCode: error.response?.status || 500
    }
    return Promise.reject(apiError)
  }
)

export default api