#!/bin/bash

echo "========================================"
echo "WeAreContent - Configuración Automática"
echo "========================================"
echo

echo "Verificando prerrequisitos..."
echo

# Verificar PHP
if ! command -v php &> /dev/null; then
    echo "[ERROR] PHP no está instalado"
    echo "Por favor instala PHP 8.1+ usando tu gestor de paquetes"
    exit 1
fi

# Verificar Composer
if ! command -v composer &> /dev/null; then
    echo "[ERROR] Composer no está instalado"
    echo "Por favor instala Composer desde https://getcomposer.org/download/"
    exit 1
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

echo "[OK] Todos los prerrequisitos están instalados"
echo

echo "========================================"
echo "Configurando Backend (Laravel)"
echo "========================================"
echo

cd backend

echo "Instalando dependencias de PHP..."
composer install

echo "Copiando archivo de configuración..."
cp .env.example .env

echo "Generando clave de aplicación..."
php artisan key:generate

echo "Ejecutando migraciones..."
php artisan migrate

echo "Backend configurado exitosamente!"
echo

cd ..

echo "========================================"
echo "Configurando Frontend (React)"
echo "========================================"
echo

cd frontend

echo "Instalando dependencias de Node.js..."
npm install

echo "Frontend configurado exitosamente!"
echo

cd ..

echo "========================================"
echo "Configuración Completada!"
echo "========================================"
echo
echo "Para iniciar el proyecto:"
echo
echo "1. Backend (Laravel):"
echo "   cd backend"
echo "   php artisan serve"
echo
echo "2. Frontend (React) - En otra terminal:"
echo "   cd frontend"
echo "   npm run dev"
echo
echo "URLs:"
echo "- Backend API: http://localhost:8000"
echo "- Frontend: http://localhost:5173"
echo
echo "¡Disfruta usando WeAreContent!"
echo
