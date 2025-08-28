import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  // Set axios authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      if (token) {
        const response = await axios.get('/api/user')
        setUser(response.data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password
      })

      const { user: userData, token: userToken } = response.data
      
      setUser(userData)
      setToken(userToken)
      localStorage.setItem('token', userToken)
      
      toast.success('¡Bienvenido de vuelta!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al iniciar sesión'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (name, email, password, passwordConfirmation) => {
    try {
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      })

      const { user: userData, token: userToken } = response.data
      
      setUser(userData)
      setToken(userToken)
      localStorage.setItem('token', userToken)
      
      toast.success('¡Cuenta creada exitosamente!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al crear la cuenta'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await axios.post('/api/logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setToken(null)
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      toast.success('Sesión cerrada')
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/user/profile', profileData)
      setUser(response.data.user)
      toast.success('Perfil actualizado exitosamente')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Error al actualizar perfil'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
