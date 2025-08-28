import React, { useState } from 'react'
import Layout from '../components/Layout'

export default function Backlinks() {
  const [backlinks, setBacklinks] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <Layout>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='bg-white overflow-hidden shadow rounded-lg'>
            <div className='px-4 py-5 sm:p-6'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-xl font-semibold text-gray-900'>
                    Backlinks
                  </h1>
                  <p className='mt-2 text-sm text-gray-700'>
                    Gestiona y analiza tus backlinks para mejorar tu SEO.
                  </p>
                </div>
                <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto'
                  >
                    Añadir Backlink
                  </button>
                </div>
              </div>

              <div className='mt-8'>
                {backlinks.length === 0 ? (
                  <div className='text-center py-12'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                      />
                    </svg>
                    <h3 className='mt-2 text-sm font-medium text-gray-900'>
                      No hay backlinks
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      Comienza añadiendo tu primer backlink para mejorar tu SEO.
                    </p>
                    <div className='mt-6'>
                      <button
                        type='button'
                        className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                      >
                        <svg
                          className='-ml-1 mr-2 h-5 w-5'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                            clipRule='evenodd'
                          />
                        </svg>
                        Añadir Backlink
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            URL
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Dominio
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Estado
                          </th>
                          <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                            Fecha
                          </th>
                          <th className='relative px-6 py-3'>
                            <span className='sr-only'>Acciones</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {/* Aquí irían los backlinks */}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
