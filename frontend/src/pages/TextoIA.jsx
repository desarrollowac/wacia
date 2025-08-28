import React, { useState } from 'react'
import './TextoIA.css'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import ProgressSidebar from '../components/ProgressSidebar'

const questions = [
  {
    id: 'country',
    title: 'Dime país donde se enfocara este articulo',
    subtitle: 'Esto nos ayudará a adaptar el lenguaje y el enfoque cultural.',
    type: 'options',
    options: [
      'Argentina (AR)',
      'Ecuador (EC)',
      'Panamá (PA)',
      'Bolivia (BO)',
      'El Salvador (SV)',
      'Paraguay (PY)',
      'Chile (CL)',
      'España (ES)',
      'Perú (PE)',
      'Colombia (CO)',
      'Guatemala (GT)',
      'Puerto Rico (PR)',
      'Costa Rica (CR)',
      'Honduras (HN)',
      'Uruguay (UY)',
      'Cuba (CU)',
      'México (MX)',
      'Venezuela (VE)',
      'R. Dominicana (DO)',
      'Nicaragua (NI)',
    ],
  },
  {
    id: 'audience',
    title: 'Cuéntame cómo es tu público objetivo.',
    subtitle: 'Descríbelo lo mejor que puedas para hacerme una gran idea.',
    type: 'textarea',
    placeholder: 'Escribe edades, problemas, comportamiento, necesidades...',
  },
  {
    id: 'keywords',
    title: '¿Cuáles son tus palabras clave principales?',
    subtitle: 'Introduce hasta 5 palabras clave separadas por comas.',
    type: 'text',
    placeholder: 'ej: marketing digital, SEO, redes sociales',
  },
  {
    id: 'tone',
    title: 'Selecciona el tono de comunicación',
    subtitle: 'Elige el que mejor se adapte a tu público y marca.',
    type: 'options',
    options: ['Formal', 'Informal', 'Humorístico', 'Inspirador', 'Técnico'],
  },
]

const TextoIA = () => {
  const [topic, setTopic] = useState('')
  const [isStarted, setIsStarted] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const { user } = useAuth()

  const handleStart = (e) => {
    e.preventDefault()
    if (topic.trim()) {
      setIsFading(true)
      setTimeout(() => {
        setIsStarted(true)
      }, 500)
    }
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle final submission
      console.log('Final Answers:', { topic, ...answers })
      alert(
        '¡Formulario completado! Revisa la consola para ver las respuestas.'
      )
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const renderStep = () => {
    const question = questions[currentStep]
    const answer = answers[question.id] || ''

    const renderInput = () => {
      switch (question.type) {
        case 'options':
          return (
            <div className='options-grid'>
              {question.options.map((option, index) => (
                <button
                  key={option}
                  className={`option-button ${
                    answer === option ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerChange(question.id, option)}
                >
                  {`${index + 1}. ${option}`}
                </button>
              ))}
            </div>
          )
        case 'textarea':
          return (
            <textarea
              className='textarea-input'
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
            />
          )
        case 'text':
          return (
            <input
              type='text'
              className='text-input'
              value={answer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
            />
          )
        default:
          return null
      }
    }

    return (
      <div className='step-container fade-in'>
        <h2 className='step-title'>{question.title}</h2>
        <p className='step-subtitle'>{question.subtitle}</p>
        <div className='input-area'>{renderInput()}</div>
      </div>
    )
  }

  return (
    <Layout>
      {isStarted ? (
        <div className='chat-container fade-in'>
          <div className='step-view'>
            {renderStep()}
            <div className='navigation-buttons'>
              {currentStep > 0 && <button onClick={handleBack}>Volver</button>}
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentStep].id]}
              >
                {currentStep === questions.length - 1
                  ? 'Finalizar'
                  : 'Continuar'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`texto-ia-container ${isFading ? 'fade-out' : ''}`}>
          <div className='initial-prompt'>
            <h2>
              ¿De qué vamos a escribir hoy,{' '}
              {user?.name?.split(' ')[0] || 'Usuario'}?
            </h2>
            <form onSubmit={handleStart}>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder='El tema del que quiero escribir es...'
              />
              <div className='prompt-footer'>
                <span>Free</span>
                <span>330 de 500 token</span>
                <button type='submit' disabled={!topic.trim()}>
                  →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default TextoIA
