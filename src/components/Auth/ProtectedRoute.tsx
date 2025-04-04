import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) return <div className="p-4 text-center">Cargando...</div>

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />
    }

    return children
}