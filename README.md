# WeAreContent - SaaS SEO Content Creation Platform

Un MVP completo para usuarios inexpertos en SEO que les permite crear contenido guiado con IA.

## 🚀 Stack Tecnológico

- **Backend**: Laravel 10 (API REST)
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Autenticación**: Laravel Sanctum
- **Base de datos**: MySQL/SQLite
- **Estilos**: Tailwind CSS con componentes personalizados
- **Iconos**: Heroicons

## 📁 Estructura del Proyecto

```
registro-wac/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/   # Controladores API
│   │   ├── Models/            # Modelos Eloquent
│   │   └── Providers/         # Service Providers
│   ├── config/                # Configuraciones
│   ├── database/migrations/   # Migraciones DB
│   └── routes/               # Rutas API
├── frontend/                  # React SPA
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── contexts/         # Context API (Auth)
│   │   ├── pages/           # Páginas principales
│   │   └── index.css        # Estilos Tailwind
│   ├── index.html
│   └── package.json
├── setup.bat                 # Script instalación Windows
├── setup.sh                  # Script instalación Linux/Mac
├── docker-compose.yml        # Servicios Docker
└── install.md               # Guía manual instalación
```

## ⚡ Instalación Rápida

### Opción 1: Script Automático (Recomendado)

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Opción 2: Instalación Manual

Ver archivo `install.md` para instrucciones detalladas.

## 🎯 Características Implementadas

### ✅ Autenticación y Usuarios
- Sistema completo de login/registro
- Autenticación con Laravel Sanctum
- Gestión de perfil de usuario
- Sistema de créditos integrado

### ✅ Dashboard Principal
- Interfaz basada en las mockups proporcionadas
- Navegación lateral con menú completo
- Tarjetas de servicios (Textos IA, Humanos, Backlinks)
- Sección de enlaces útiles y FAQs
- Header con información de créditos y usuario

### ✅ Creador de Contenido con IA
- Formulario guiado con tooltips informativos
- Campos: título, descripción, tipo, keywords, audiencia, longitud, tono
- **Guardado automático** en localStorage cada segundo
- Generación de contenido con IA (stub implementado)
- Vista previa del contenido generado
- Validaciones y manejo de errores

### ✅ Funcionalidades Avanzadas
- **Guardado parcial**: Auto-save en localStorage + AJAX al backend
- **Tooltips contextuales**: Ayuda en tiempo real para cada campo
- **Sistema de créditos**: Control de uso de IA
- **Responsive design**: Funciona en móvil y desktop
- **Interfaz en español**: Completamente localizada

### ✅ Backend API Completo
- Endpoints RESTful para autenticación
- CRUD completo para proyectos de contenido
- Integración con IA (preparado para OpenAI)
- Middleware de autenticación y CORS
- Migraciones de base de datos

## 🎨 Diseño y UX

La interfaz replica fielmente las mockups proporcionadas:

- **Login**: Diseño moderno con gradientes purple/pink, campos de email/password, opción Google
- **Dashboard**: Sidebar con navegación, header con créditos, cards de servicios principales
- **Creador**: Formulario intuitivo con tooltips, vista previa, guardado automático

## 🔧 Configuración de Desarrollo

### Backend (Puerto 8000)
```bash
cd backend
php artisan serve
```

### Frontend (Puerto 5173)
```bash
cd frontend
npm run dev
```

### Base de Datos
```bash
cd backend
php artisan migrate
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Health**: http://localhost:8000/health

## 🔑 Variables de Entorno

Configurar en `backend/.env`:

```env
APP_NAME=WeAreContent
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost:5173

# Base de datos
DB_CONNECTION=mysql
DB_DATABASE=wearecontent

# OpenAI (opcional)
OPENAI_API_KEY=tu_api_key_aqui
```

## 📱 Funcionalidades Principales

1. **Registro/Login** con validación completa
2. **Dashboard** con estadísticas y accesos rápidos  
3. **Creador de Contenido** con IA y guardado automático
4. **Gestión de Perfil** con actualización de datos
5. **Sistema de Créditos** para controlar uso
6. **Navegación Intuitiva** con sidebar y breadcrumbs

## 🚀 Próximos Pasos

- Integrar OpenAI API real para generación de contenido
- Implementar módulos de Backlinks e Influencers
- Agregar sistema de pagos para créditos
- Implementar notificaciones en tiempo real
- Agregar analytics y métricas de uso

## 🛠️ Tecnologías Utilizadas

- **Laravel 10**: Framework PHP para API REST
- **React 18**: Biblioteca JavaScript para UI
- **Vite**: Build tool rápido para desarrollo
- **Tailwind CSS**: Framework CSS utility-first
- **Axios**: Cliente HTTP para API calls
- **React Router**: Navegación SPA
- **React Hot Toast**: Notificaciones elegantes
- **Heroicons**: Iconos SVG optimizados

¡El MVP está listo para usar! 🎉
