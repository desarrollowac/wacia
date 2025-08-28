# Cómo Correr el Proyecto WeAreContent

Esta guía te ayudará a levantar el entorno de desarrollo completo (Backend y Frontend).

## Prerrequisitos (¡MUY IMPORTANTE!)

Antes de ejecutar cualquier script, es **fundamental** que tengas instaladas y configuradas en tu sistema las siguientes herramientas. Los scripts del proyecto **no instalan** estos programas por ti.

Asegúrate de tener:

- **PHP** (versión 8.1 o superior)
- **Composer** (gestor de dependencias de PHP)
- **Node.js** (versión 18 o superior)
- **NPM** (generalmente se instala con Node.js)

### ¿Cómo sé si los tengo instalados y en el PATH?

Abre una terminal y ejecuta los siguientes comandos:

```bash
php --version
composer --version
node --version
npm --version
```

Si recibes un error como `"comando no reconocido"`, significa que el programa no está instalado o no está en el `PATH` de tu sistema. La causa más común es que PHP no se añade al `PATH` durante la instalación.

**Para añadir PHP al PATH en Windows:**

1.  Busca "Editar las variables de entorno del sistema" en el menú de inicio.
2.  Haz clic en el botón "Variables de entorno...".
3.  En la sección "Variables del sistema", busca y selecciona la variable `Path` y haz clic en "Editar".
4.  Haz clic en "Nuevo" y pega la ruta a la carpeta donde instalaste PHP (por ejemplo, `C:\php`).
5.  Haz clic en "Aceptar" en todas las ventanas. 
6.  **Importante**: Cierra y vuelve a abrir cualquier terminal que tuvieras abierta para que los cambios surtan efecto.

## 1. Instalación Inicial

Si es la primera vez que clonas el proyecto, necesitas instalar todas las dependencias. Para ello, hemos creado scripts que lo hacen todo por ti.

- En **Windows**: Abre una terminal y ejecuta:
  ```bash
  setup.bat
  ```
- En **macOS o Linux**: Abre una terminal y ejecuta:
  ```bash
  chmod +x setup.sh
  ./setup.sh
  ```

Este proceso puede tardar varios minutos.

## 2. Iniciar los Servidores

Para iniciar el proyecto, simplemente ejecuta el script correspondiente a tu sistema operativo. El script se encargará de todo:

1.  Instalará las dependencias del frontend (si es la primera vez).
2.  Creará la base de datos del backend y ejecutará las migraciones.
3.  Levantará ambos servidores (backend y frontend).

- En **Windows**: Haz doble clic en el archivo `start.bat` o ejecútalo desde la terminal:
  ```bash
  start.bat
  ```
- En **macOS o Linux**: Abre una terminal y ejecuta:
  ```bash
  chmod +x start.sh
  ./start.sh
  ```

Esto abrirá dos nuevas ventanas de terminal, una para el backend de Laravel y otra para el frontend de React.

## 3. Acceder a la Aplicación

- **Frontend (la aplicación web)**: Abre tu navegador y ve a [http://localhost:5173](http://localhost:5173)
- **Backend (la API)**: Estará corriendo en [http://127.0.0.1:8000](http://127.0.0.1:8000)

¡Y listo! Ya puedes usar la aplicación.
