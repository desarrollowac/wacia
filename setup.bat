@echo off
echo ========================================
echo WeAreContent - Setup Automatico
echo ========================================
echo.

echo Verificando prerrequisitos...
echo.

REM Verificar PHP
php --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] PHP no esta instalado o no esta en el PATH
    echo Por favor instala PHP 8.1+ desde https://windows.php.net/download/
    pause
    exit /b 1
)

REM Verificar Composer
composer --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Composer no esta instalado
    echo Por favor instala Composer desde https://getcomposer.org/download/
    pause
    exit /b 1
)

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Todos los prerrequisitos estan instalados
echo.

echo ========================================
echo Configurando Backend (Laravel)
echo ========================================
echo.

cd backend

echo Instalando dependencias de PHP...
composer install

echo Copiando archivo de configuracion...
copy .env.example .env

echo Generando clave de aplicacion...
php artisan key:generate

echo Ejecutando migraciones...
php artisan migrate

echo Backend configurado exitosamente!
echo.

cd ..

echo ========================================
echo Configurando Frontend (React)
echo ========================================
echo.

cd frontend

echo Instalando dependencias de Node.js...
npm install

echo Frontend configurado exitosamente!
echo.

cd ..

echo ========================================
echo Configuracion Completada!
echo ========================================
echo.
echo Para iniciar el proyecto:
echo.
echo 1. Backend (Laravel):
echo    cd backend
echo    php artisan serve
echo.
echo 2. Frontend (React) - En otra terminal:
echo    cd frontend
echo    npm run dev
echo.
echo URLs:
echo - Backend API: http://localhost:8000
echo - Frontend: http://localhost:5173
echo.
echo ¡Disfruta usando WeAreContent!
echo.
pause
