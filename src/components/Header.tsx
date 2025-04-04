import { useNavigate } from 'react-router-dom'

export default function Header({ userData }: { userData: { fullName: string, identifier: string } }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('mediview_token')
    navigate('/')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{userData.fullName}</h1>
          <p className="text-sm text-gray-500">ID: {userData.identifier}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}