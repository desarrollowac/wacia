@echo off
ECHO Iniciando el entorno de desarrollo de WeAreContent...

REM Comprobar dependencias del Backend
IF NOT EXIST "backend\vendor" (
    ECHO.
    ECHO ERROR: Las dependencias del backend no estan instaladas.
    ECHO Por favor, ejecuta el script 'setup.bat' primero para instalar todo lo necesario.
    ECHO.
    PAUSE
    EXIT
)

REM Comprobar e instalar dependencias del Frontend si es necesario
IF NOT EXIST "frontend\node_modules" (
    ECHO La carpeta node_modules no existe. Instalando dependencias...
    ECHO Esto puede tardar unos minutos.
    cd frontend
    call npm install
    cd ..
)

REM Configurar y migrar la base de datos del Backend si es necesario
IF NOT EXIST "backend\database\database.sqlite" (
    ECHO Creando archivo de base de datos...
    type nul > "backend\database\database.sqlite"
)
ECHO Ejecutando migraciones de la base de datos...
cd backend
call php artisan migrate
cd ..

REM Iniciar servidor de Backend (Laravel)
ECHO Iniciando Backend en http://127.0.0.1:8000
start "Backend" cmd /k "cd backend && php artisan serve"

REM Iniciar servidor de Frontend (React)
ECHO Iniciando Frontend en http://localhost:5173
start "Frontend" cmd /k "cd frontend && npm run dev"

ECHO.
ECHO Los servidores se han iniciado en ventanas de terminal separadas.
ECHO Asegurate de que los puertos 8000 y 5173 esten libres.
