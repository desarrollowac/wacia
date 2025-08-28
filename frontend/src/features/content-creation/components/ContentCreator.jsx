import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import Layout from '../../../components/layout/Layout'
import axios from '../../../lib/axios'
import toast from 'react-hot-toast'
import {
  InformationCircleIcon,
  SparklesIcon,
  DocumentTextIcon,
  BookmarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function ContentCreator() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_type: 'blog_post',
    target_keywords: [],
    target_audience: '',
    content_length: 'medium',
    tone: 'professional'
  })
  const [keywordInput, setKeywordInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState({})

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('contentCreator_draft')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('contentCreator_draft', JSON.stringify(formData))
    }, 1000)

    return () => clearTimeout(timer)
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.target_keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        target_keywords: [...prev.target_keywords, keywordInput.trim()]
      }))
      setKeywordInput('')
    }
  }

  const removeKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      target_keywords: prev.target_keywords.filter(k => k !== keyword)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('/api/content-projects', formData)
      toast.success('Proyecto guardado exitosamente')
      localStorage.removeItem('contentCreator_draft')
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        content_type: 'blog_post',
        target_keywords: [],
        target_audience: '',
        content_length: 'medium',
        tone: 'professional'
      })
      setGeneratedContent('')
    } catch (error) {
      toast.error('Error al guardar el proyecto')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateAIContent = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Por favor completa el título y descripción antes de generar contenido')
      return
    }

    setAiLoading(true)
    try {
      // First save the project
      const projectResponse = await axios.post('/api/content-projects', formData)
      const projectId = projectResponse.data.project.id

      // Then generate AI content
      const aiResponse = await axios.post(`/api/content-projects/${projectId}/generate-ai`)
      setGeneratedContent(aiResponse.data.project.draft_content)
      setShowPreview(true) // Mostrar automáticamente la vista previa
      toast.success('¡Contenido generado con IA exitosamente!')
    } catch (error) {
      const message = error.response?.data?.message || 'Error al generar contenido con IA'
      toast.error(message)
      console.error('Error:', error)
    } finally {
      setAiLoading(false)
    }
  }

  const showTooltip = (field) => {
    setTooltipVisible(prev => ({ ...prev, [field]: true }))
  }

  const hideTooltip = (field) => {
    setTooltipVisible(prev => ({ ...prev, [field]: false }))
  }

  const tooltips = {
    content_type: 'Selecciona el tipo de contenido que deseas crear. Cada tipo tiene optimizaciones específicas para SEO.',
    target_keywords: 'Agrega palabras clave relevantes para tu contenido. Esto ayudará a la IA a optimizar el texto para SEO.',
    target_audience: 'Define quién es tu audiencia objetivo. Esto influirá en el tono y estilo del contenido generado.',
    content_length: 'Elige la longitud aproximada del contenido. Contenido más largo tiende a posicionar mejor en SEO.',
    tone: 'Selecciona el tono que mejor se adapte a tu marca y audiencia objetivo.'
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Crear Contenido con IA
          </h1>
          <p className="text-gray-600">
            Genera contenido optimizado para SEO en segundos
          </p>
        </div>

        {/* Credits Warning */}
        {user?.credits < 5 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <InformationCircleIcon className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Créditos bajos
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Te quedan {user?.credits || 0} créditos. Considera recargar para continuar generando contenido.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del contenido *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Guía completa de SEO para principiantes"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción del contenido *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="input-field"
                  placeholder="Describe brevemente de qué tratará tu contenido..."
                  required
                />
              </div>

              {/* Content Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de contenido
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('content_type')}
                    onMouseLeave={() => hideTooltip('content_type')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <InformationCircleIcon className="h-4 w-4 inline" />
                  </button>
                </label>
                <select
                  name="content_type"
                  value={formData.content_type}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="blog_post">Artículo de Blog</option>
                  <option value="article">Artículo Especializado</option>
                  <option value="social_media">Contenido para Redes Sociales</option>
                  <option value="email">Email Marketing</option>
                  <option value="landing_page">Página de Aterrizaje</option>
                </select>
                {tooltipVisible.content_type && (
                  <div className="tooltip show -top-2 left-0 transform -translate-y-full">
                    {tooltips.content_type}
                  </div>
                )}
              </div>

              {/* Keywords */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palabras clave objetivo
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('target_keywords')}
                    onMouseLeave={() => hideTooltip('target_keywords')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <InformationCircleIcon className="h-4 w-4 inline" />
                  </button>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    className="input-field flex-1"
                    placeholder="Ej: SEO, marketing digital"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="btn-secondary"
                  >
                    Agregar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.target_keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {tooltipVisible.target_keywords && (
                  <div className="tooltip show -top-2 left-0 transform -translate-y-full">
                    {tooltips.target_keywords}
                  </div>
                )}
              </div>

              {/* Target Audience */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audiencia objetivo
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('target_audience')}
                    onMouseLeave={() => hideTooltip('target_audience')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <InformationCircleIcon className="h-4 w-4 inline" />
                  </button>
                </label>
                <input
                  type="text"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Ej: Emprendedores, marketers digitales, principiantes en SEO"
                />
                {tooltipVisible.target_audience && (
                  <div className="tooltip show -top-2 left-0 transform -translate-y-full">
                    {tooltips.target_audience}
                  </div>
                )}
              </div>

              {/* Content Length */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitud del contenido
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('content_length')}
                    onMouseLeave={() => hideTooltip('content_length')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <InformationCircleIcon className="h-4 w-4 inline" />
                  </button>
                </label>
                <select
                  name="content_length"
                  value={formData.content_length}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="short">Corto (300-500 palabras)</option>
                  <option value="medium">Medio (500-1000 palabras)</option>
                  <option value="long">Largo (1000+ palabras)</option>
                </select>
                {tooltipVisible.content_length && (
                  <div className="tooltip show -top-2 left-0 transform -translate-y-full">
                    {tooltips.content_length}
                  </div>
                )}
              </div>

              {/* Tone */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tono del contenido
                  <button
                    type="button"
                    onMouseEnter={() => showTooltip('tone')}
                    onMouseLeave={() => hideTooltip('tone')}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <InformationCircleIcon className="h-4 w-4 inline" />
                  </button>
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="professional">Profesional</option>
                  <option value="friendly">Amigable</option>
                  <option value="formal">Formal</option>
                  <option value="informal">Informal</option>
                  <option value="persuasive">Persuasivo</option>
                </select>
                {tooltipVisible.tone && (
                  <div className="tooltip show -top-2 left-0 transform -translate-y-full">
                    {tooltips.tone}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={generateAIContent}
                  disabled={aiLoading || !user?.credits}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {aiLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generando...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4 mr-2" />
                      Generar con IA
                    </>
                  )}
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <BookmarkIcon className="w-4 h-4 mr-2" />
                      Guardar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Vista previa del contenido
              </h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <EyeIcon className="w-4 h-4 mr-1" />
                {showPreview ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {showPreview && generatedContent ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                  {generatedContent}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Sin contenido generado
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Completa el formulario y genera contenido con IA para ver la vista previa.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
