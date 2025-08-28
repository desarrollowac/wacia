#!/bin/bash

echo "Iniciando el entorno de desarrollo de WeAreContent..."

# Comprobar dependencias del Backend
if [ ! -d "backend/vendor" ]; then
  echo ""
  echo "ERROR: Las dependencias del backend no estan instaladas."
  echo "Por favor, ejecuta el script './setup.sh' primero para instalar todo lo necesario."
  echo ""
  exit 1
fi

# Comprobar e instalar dependencias del Frontend si es necesario
if [ ! -d "frontend/node_modules" ]; then
  echo "La carpeta node_modules no existe. Instalando dependencias..."
  echo "Esto puede tardar unos minutos."
  (cd frontend && npm install)
fi

# --- Para macOS ---
# Descomenta las siguientes líneas si estás en macOS
# echo "Iniciando Backend en http://127.0.0.1:8000"
# osascript -e 'tell app "Terminal" to do script "cd $(pwd)/backend && php artisan serve"'
# 
# echo "Iniciando Frontend en http://localhost:5173"
# osascript -e 'tell app "Terminal" to do script "cd $(pwd)/frontend && npm run dev"'

# Configurar y migrar la base de datos del Backend si es necesario
if [ ! -f "backend/database/database.sqlite" ]; then
  echo "Creando archivo de base de datos..."
  touch "backend/database/database.sqlite"
fi
echo "Ejecutando migraciones de la base de datos..."
(cd backend && php artisan migrate)

# --- Para Linux (Gnome Terminal) ---
# Descomenta las siguientes líneas si estás en Linux con Gnome Terminal
echo "Iniciando Backend en http://127.0.0.1:8000"
gnome-terminal --working-directory=backend -- bash -c "php artisan serve; exec bash"

echo "Iniciando Frontend en http://localhost:5173"
gnome-terminal --working-directory=frontend -- bash -c "npm run dev; exec bash"

echo "Los servidores se han iniciado en terminales separadas."
