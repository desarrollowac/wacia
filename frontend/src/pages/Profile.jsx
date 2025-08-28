import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Layout from '../components/layout/Layout'
import {
  UserIcon,
  EnvelopeIcon,
  CreditCardIcon,
  CogIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await updateProfile(formData)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Configuración de Perfil
          </h1>
          <p className="text-gray-600">
            Gestiona tu información personal y preferencias de cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Información Personal
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field pl-10"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL del Avatar (opcional)
                  </label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="https://ejemplo.com/tu-avatar.jpg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Actualizando...
                    </>
                  ) : (
                    'Actualizar Perfil'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estado de la Cuenta
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Créditos disponibles</span>
                  <span className="font-semibold text-purple-600">
                    {user?.credits || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tipo de cuenta</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {user?.subscription_type || 'Gratuita'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Miembro desde</span>
                  <span className="text-sm text-gray-900">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <CreditCardIcon className="h-5 w-5 mr-3 text-gray-400" />
                  Comprar más créditos
                </button>
                
                <button className="w-full flex items-center px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <CogIcon className="h-5 w-5 mr-3 text-gray-400" />
                  Configurar notificaciones
                </button>
                
                <button className="w-full flex items-center px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  <CheckCircleIcon className="h-5 w-5 mr-3 text-gray-400" />
                  Ver historial de proyectos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
