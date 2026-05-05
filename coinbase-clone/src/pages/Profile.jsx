import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div className="bg-cb-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-cb-dark mb-8">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <div className="bg-white rounded-2xl border border-cb-gray-200 shadow-sm p-8 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-cb-blue rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">{initials}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-cb-dark">{user?.name}</h2>
              <p className="text-cb-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Full Name', value: user?.name },
              { label: 'Email Address', value: user?.email },
              { label: 'Member Since', value: user?.createdAt ? formatDate(user.createdAt) : '—' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center py-4 border-b border-cb-gray-100">
                <span className="text-cb-gray-500 font-medium">{row.label}</span>
                <span className="font-semibold text-cb-dark">{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-4">
              <span className="text-cb-gray-500 font-medium">Account Status</span>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-semibold rounded-full">Active</span>
            </div>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full py-3 px-6 bg-red-50 text-red-600 font-semibold rounded-xl border border-red-100 hover:bg-red-100 transition-colors duration-200">
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Profile
