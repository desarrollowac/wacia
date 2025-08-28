# Instalación Simplificada - WeAreContent

## Problema Actual
Tu PHP necesita extensiones habilitadas. Aquí tienes dos opciones:

## Opción 1: Arreglar PHP (Recomendado)

1. **Editar php.ini**:
   - Abrir: `C:\Users\victo\php-8.4.11-Win32-vs17-x64\php.ini`
   - Buscar y descomentar (quitar `;`):
     ```ini
     extension=fileinfo
     extension=zip
     extension=openssl
     extension=pdo_mysql
     extension=mbstring
     ```

2. **Reiniciar terminal** y ejecutar:
   ```bash
   cd backend
   composer install
   php artisan key:generate
   php artisan migrate
   ```

3. **Instalar frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

## Opción 2: Usar SQLite (Más Simple)

Si no quieres configurar MySQL, puedes usar SQLite:

1. **Cambiar en backend/.env**:
   ```env
   DB_CONNECTION=sqlite
   DB_DATABASE=database.sqlite
   ```

2. **Crear archivo de base de datos**:
   ```bash
   cd backend
   touch database/database.sqlite
   ```

## Iniciar el Proyecto

Una vez instalado:

**Terminal 1 (Backend):**
```bash
cd backend
php artisan serve
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Si Sigues Teniendo Problemas

Puedes usar XAMPP que incluye PHP con todas las extensiones:
1. Descargar XAMPP desde https://www.apachefriends.org/
2. Usar el PHP de XAMPP en lugar del tuyo
