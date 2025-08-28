import React from 'react';

const steps = [
  { name: 'Palabras clave', description: 'De acuerdo con el tema del que quieres escribir analizaremos el volumen de búsquedas en las principales herramientas de SEO.' },
  { name: 'Título', description: 'Con la palabra clave que elijas, te mostraré 5 opciones de títulos para tu contenido.' },
  { name: 'Tono de comunicación', description: 'Con el análisis del tono de comunicación, adaptaré el contenido para que no tengas que dar muchas vueltas.' },
  { name: 'Estilo del contenido', description: 'Con las indicaciones que te pediré, podré estructurar el contenido de manera coherente con tu objetivo.' },
  { name: 'Artículo final', description: 'Te entregaré el contenido optimizado con todos los parámetros de SEO y listo para descargar o publicar.' }
];

const ProgressSidebar = ({ currentStep = 0 }) => {
  return (
    <div className="progress-sidebar">
      <ul>
        {steps.map((step, index) => (
          <li key={step.name} className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
            <div className="step-indicator"></div>
            <div className="step-content">
              <strong>{step.name}</strong>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressSidebar;
