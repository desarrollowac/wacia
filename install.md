# Guía de Instalación - WeAreContent

## Prerrequisitos Necesarios

### 1. Instalar PHP (8.1 o superior)
Descargar desde: https://windows.php.net/download/
- Descargar "Thread Safe" version
- Agregar PHP al PATH del sistema

### 2. Instalar Composer
Descargar desde: https://getcomposer.org/download/
- Ejecutar el instalador para Windows
- Verificar instalación: `composer --version`

### 3. Instalar Node.js (18 o superior)
Descargar desde: https://nodejs.org/
- Incluye npm automáticamente
- Verificar instalación: `node --version` y `npm --version`

### 4. Instalar Git
Descargar desde: https://git-scm.com/download/win

## Comandos de Instalación (ejecutar después de instalar prerrequisitos)

```bash
# 1. Crear backend Laravel
composer create-project laravel/laravel backend
cd backend
composer require laravel/sanctum

# 2. Crear frontend React
cd ../
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npm install axios react-router-dom @heroicons/react

# 3. Configurar Tailwind
npx tailwindcss init -p

# 4. Volver al directorio raíz
cd ../
```

## Configuración Posterior

1. Configurar `.env` en backend
2. Ejecutar migraciones: `php artisan migrate`
3. Configurar CORS y Sanctum
4. Iniciar servidores de desarrollo
