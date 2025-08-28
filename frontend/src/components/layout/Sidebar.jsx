import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { navigation } from '../../utils/navigation'
import {
  ChevronDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const NavItem = ({ item }) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isParentActive = item.children?.some((child) =>
    location.pathname.startsWith(child.href)
  )

  useEffect(() => {
    if (isParentActive) {
      setIsOpen(true)
    }
  }, [isParentActive])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  if (item.children) {
    return (
      <div>
        <button
          onClick={handleToggle}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors duration-200 ${
            isParentActive
              ? 'text-[#BE00FE]'
              : 'text-[#3C3C3C] hover:bg-gray-200/50'
          }`}
        >
          <div className='flex items-center'>
            <item.icon className='mr-3 h-6 w-6' />
            <span>{item.name}</span>
          </div>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>
        {isOpen && (
          <div className='pl-8 mt-2 space-y-1'>
            {item.children.map((child) => {
              const isChildActive = location.pathname === child.href
              return (
                <NavLink
                  key={child.name}
                  to={child.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isChildActive
                      ? 'bg-[#EAE6F6] text-[#BE00FE]'
                      : 'text-[#3C3C3C] hover:bg-gray-200/50'
                  }`}
                >
                  {child.name}
                </NavLink>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const isActive = location.pathname === item.href
  return (
    <NavLink
      to={item.href}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-[#EAE6F6] text-[#BE00FE]'
          : 'text-[#3C3C3C] hover:bg-gray-200/50'
      }`}
    >
      <item.icon className='mr-3 h-6 w-6' />
      {item.name}
    </NavLink>
  )
}

export default function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <div className='w-72 bg-white flex flex-col h-screen shadow-lg sticky top-0'>
      <div className='p-6 border-b border-gray-200/80'>
        <div className='flex items-center'>
          <img
            src='/logo.png'
            alt='WeAreContent Logo'
            className='h-10 w-auto'
          />
        </div>
      </div>

      <nav className='flex-1 px-4 py-6 space-y-2'>
        {navigation.map((item) => (
          <NavItem key={item.name} item={item} />
        ))}
      </nav>


      <div className='p-4 mt-auto'>
        <div className='p-4 border-t border-gray-200/80'>
          <button className='w-full bg-[#DDF6EC] text-[#3C3C3C] px-4 py-3 rounded-xl text-sm font-semibold hover:bg-opacity-80 transition-colors duration-200 flex items-center justify-center shadow-sm'>
            Soporte
            <ChatBubbleOvalLeftEllipsisIcon className='ml-2 h-5 w-5' />
          </button>
        </div>
        <button
          onClick={logout}
          className='w-full flex items-center px-4 py-3 text-sm font-medium text-left rounded-lg transition-colors duration-200 text-[#3C3C3C] hover:bg-gray-200/50'
        >
          <ArrowRightOnRectangleIcon className='mr-3 h-6 w-6' />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  )
}
