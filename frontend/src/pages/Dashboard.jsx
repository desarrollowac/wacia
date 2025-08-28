import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import axios from 'axios';
import {
  SparklesIcon,
  LinkIcon,
  PencilIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false); // Assuming initial state is not loading
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Mock data as the backend is not connected for stats
  const stats = {
    total_projects: 0,
    completed_projects: 0,
    remaining_credits: 2000,
    subscription_status: 'active'
  };

  const serviceCards = [
    {
      title: 'Textos con IA',
      description: 'Genera contenidos en segundos con optimización real para SEO.',
      icon: SparklesIcon,
      action: 'Crear contenido',
      link: '/texto-ia',
      tag: 'Subscripción',
      gradient: 'linear-gradient(to bottom right, #FED992, #FFFFFF)',
    },
    {
      title: 'Textos con Humanos',
      description: 'Contenido experto, optimizado para posicionarte y generar resultados reales.',
      icon: PencilIcon,
      action: 'Realizar pedido',
      link: '/humanos',
      tag: 'Créditos',
      gradient: 'linear-gradient(to bottom right, #DDF6EC, #FFFFFF)',
    },
    {
      title: 'Backlinks',
      description: 'Aumenta la autoridad de dominio y acelera el posicionamiento web con enlaces de calidad.',
      icon: LinkIcon,
      action: 'Ver medios',
      link: '/backlinks',
      tag: 'Créditos',
      gradient: 'linear-gradient(to bottom right, #F2E6F6, #FFFFFF)',
    }
  ];

  const usefulLinks = [
    { title: 'Cómo funciona crear contenidos de texto con IA.', icon: LinkIcon },
    { title: 'Cómo funciona la compra de créditos para textos con humanos y backlinks.', icon: LinkIcon },
    { title: 'Conoce todos los planes para la generación de textos con IA.', icon: LinkIcon },
    { title: 'Paso a paso para crear un proyecto de backlinks.', icon: LinkIcon },
    { title: 'Si necesitas crear una estragía de SEO personalizada, habla con nuestro equipo de ventas.', icon: LinkIcon },
  ];

  const faqs = [
    {
        question: '¿Qué tipo de contenido puedo generar con la IA?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        question: '¿Cómo funciona el keyword research en texto con IA?',
        answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        question: '¿Quiénes escriben los textos con humanos?',
        answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
        question: '¿Cómo me aseguro de que el backlink sea de calidad?',
        answer: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        question: '¿Cómo se calculan los créditos en la plataforma?',
        answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
    },
    {
        question: '¿Puedo pagar un plan de texto IA con mis créditos?',
        answer: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    }
];

const FaqItem = ({ faq, isOpen, onToggle }) => {
    return (
        <div className="border-b border-gray-200/80 py-4 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center text-left focus:outline-none"
            >
                <span className="text-sm font-medium text-[#3C3C3C]">{faq.question}</span>
                <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 mt-3' : 'max-h-0'}`}>
                <p className="text-sm text-gray-600 pr-4">
                    {faq.answer}
                </p>
            </div>
        </div>
    );
};

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#BE00FE]"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="min-h-screen w-full p-8"
        style={{ background: 'linear-gradient(to bottom, #EAE6F6, #FFFFFF)' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#3C3C3C] mb-2">
              Hola, {user?.name?.split(' ')[0] || 'Pedro Juan'}.
            </h1>
            <p className="text-lg text-[#3C3C3C]">
              Unimos el poder del SEO con la IA en un solo lugar.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {serviceCards.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
                style={{ background: service.gradient }}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-white/50">
                      <service.icon className="w-8 h-8 text-[#BE00FE]" />
                    </div>
                    <span className="text-xs text-[#3C3C3C] bg-white/60 px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#3C3C3C] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#3C3C3C] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <Link
                  to={service.link}
                  className="w-full text-center px-4 py-3 bg-[#BE00FE] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors duration-200 shadow-md"
                >
                  {service.action}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Useful Links (spanning 2 columns) */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <LinkIcon className="w-7 h-7 text-[#3C3C3C] mr-3" />
                <h2 className="text-xl font-bold text-[#3C3C3C]">Enlaces útiles</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {usefulLinks.map((link, index) => (
                  <a
                    href="#"
                    key={index}
                    className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center group"
                  >
                    <link.icon className="w-6 h-6 text-[#BE00FE] mr-4 flex-shrink-0" />
                    <p className="text-sm text-[#3C3C3C] font-medium group-hover:text-black">
                      {link.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQs (spanning 1 column) */}
            <div>
                <div className="flex items-center mb-6">
                    <QuestionMarkCircleIcon className="w-7 h-7 text-[#3C3C3C] mr-3" />
                    <h2 className="text-xl font-bold text-[#3C3C3C]">Preguntas frecuentes</h2>
                </div>
                <div className="bg-[#F2E6F6]/50 rounded-2xl shadow-lg p-6">
                    {faqs.map((faq, index) => (
                        <FaqItem 
                            key={index} 
                            faq={faq} 
                            isOpen={openFaqIndex === index}
                            onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
