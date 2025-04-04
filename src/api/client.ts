import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('mediview_token') || ''}`
  }
})

// Interceptor para JWT
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mediview_token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default api