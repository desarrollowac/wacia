# Cómo Correr el Proyecto

Esta guía explica cómo iniciar y detener los servidores de desarrollo una vez que el proyecto ha sido instalado y configurado.

## Prerrequisitos

Asegúrate de haber seguido **todos los pasos** del archivo `install.md` para tu método de instalación elegido (Docker o Manual).

## 1. Iniciar los Servidores

Hemos creado scripts que automatizan el proceso de levantar el entorno completo (backend y frontend).

-   En **Windows**: Haz doble clic en el archivo `start.bat` o ejecútalo desde la terminal:
    ```bash
    start.bat
    ```
-   En **macOS o Linux**: Abre una terminal y ejecuta:
    ```bash
    chmod +x start.sh
    ./start.sh
    ```

**¿Qué hacen estos scripts?**

1.  Verifican e instalan dependencias si es necesario.
2.  Ejecutan las migraciones de la base de datos del backend.
3.  Inician el servidor del backend (Laravel).
4.  Inician el servidor del frontend (Vite/React).

Se abrirán dos nuevas ventanas de terminal, una para cada servidor. **No las cierres**, ya que esto detendrá los servidores.

## 2. Acceder a la Aplicación

Una vez que los servidores estén corriendo, puedes acceder a la aplicación:

-   **Frontend (Aplicación Web)**: [http://localhost:5173](http://localhost:5173)
-   **Backend (API)**: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## 3. Detener los Servidores

Para detener la aplicación:

1.  **Cierra las terminales**: Cierra las dos ventanas de terminal que se abrieron con el script `start`.

2.  **Detén los contenedores de Docker** (si usaste ese método de instalación):
    Ejecuta el siguiente comando en la raíz del proyecto para detener los servicios de MySQL y Redis.
    ```bash
    docker-compose down
    ```
