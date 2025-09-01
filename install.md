# Guía de Instalación Manual Completa

Esta guía detalla todos los pasos para instalar, configurar y ejecutar el proyecto desde cero, sin utilizar scripts automatizados.

## 1. Prerrequisitos

Antes de empezar, asegúrate de tener instaladas y configuradas las siguientes herramientas en tu sistema:

-   **Git**: Para clonar el repositorio. ([Descargar](https://git-scm.com/download/win))
-   **PHP (v8.1 o superior)**: Para el backend. ([Descargar "Thread Safe"](https://windows.php.net/download/))
    -   **¡Importante!** Asegúrate de que la ruta a `php.exe` esté en la variable de entorno `PATH` de tu sistema.
-   **Composer**: Gestor de dependencias de PHP. ([Descargar](https://getcomposer.org/download/))
-   **Node.js (v18 o superior)**: Para el frontend. ([Descargar](https://nodejs.org/))
-   **Servidor de Base de Datos**: Un servidor MySQL (v8.0) o compatible. Debes tener credenciales (host, puerto, usuario, contraseña) y una base de datos creada.

## 2. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd registro-wac
```

## 3. Configuración del Backend (Laravel)

Todos los siguientes comandos deben ejecutarse desde la raíz del proyecto.

1.  **Navega a la carpeta del backend**:
    ```bash
    cd backend
    ```

2.  **Copia el archivo de entorno**:
    ```bash
    copy .env.example .env
    ```

3.  **Configura tus credenciales de base de datos**:
    -   Abre el archivo `.env` que acabas de crear.
    -   Modifica las siguientes variables con los datos de tu base de datos local:
        ```
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=wearecontent
        DB_USERNAME=root
        DB_PASSWORD=
        ```

4.  **Instala las dependencias de PHP**:
    ```bash
    composer install
    ```

5.  **Genera la clave de la aplicación**:
    ```bash
    php artisan key:generate
    ```

6.  **Ejecuta las migraciones de la base de datos**:
    Este comando creará la estructura de tablas en la base de datos que configuraste.
    ```bash
    php artisan migrate
    ```

7.  **Vuelve a la carpeta raíz**:
    ```bash
    cd ..
    ```

## 4. Configuración del Frontend (React)

1.  **Navega a la carpeta del frontend**:
    ```bash
    cd frontend
    ```

2.  **Instala las dependencias de Node.js**:
    ```bash
    npm install
    ```

3.  **Vuelve a la carpeta raíz**:
    ```bash
    cd ..
    ```

## 5. Ejecutar la Aplicación

Necesitarás **dos terminales separadas** para ejecutar el backend y el frontend simultáneamente.

**Terminal 1: Iniciar el Backend**

```bash
cd backend
php artisan serve
```
> El backend estará disponible en `http://127.0.0.1:8000`

**Terminal 2: Iniciar el Frontend**

```bash
cd frontend
npm run dev
```
> El frontend estará disponible en `http://localhost:5173`

## 6. Detener la Aplicación

Para detener los servidores, ve a cada una de las terminales y presiona `Ctrl + C`.
