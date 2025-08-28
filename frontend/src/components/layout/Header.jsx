import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  BellIcon, 
  QuestionMarkCircleIcon,
  CreditCardIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Inicio</span>
            <span>/</span>
            <span>Texto</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Texto IA</span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Strategy Selector */}
            <button className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <SparklesIcon className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Solicitar estrategia</span>
            </button>

            {/* Help */}
            <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <QuestionMarkCircleIcon className="w-5 h-5 mr-1" />
              <span className="text-sm">Ayuda</span>
            </button>

            {/* Credits */}
            <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg">
              <CreditCardIcon className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                SALDO {user?.credits || 0} créditos
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user?.name || 'Usuario'}</p>
                <p className="text-gray-500">ID {user?.id || '000000'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
