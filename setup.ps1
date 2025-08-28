Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WeAreContent - Setup Automatico" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Verificando prerrequisitos..." -ForegroundColor Yellow
Write-Host ""

# Verificar PHP
try {
    $phpVersion = php --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] PHP encontrado" -ForegroundColor Green
    } else {
        throw "PHP no encontrado"
    }
} catch {
    Write-Host "[ERROR] PHP no esta instalado o no esta en el PATH" -ForegroundColor Red
    Write-Host "Por favor instala PHP 8.1+ desde https://windows.php.net/download/" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar Composer
try {
    $composerVersion = composer --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Composer encontrado" -ForegroundColor Green
    } else {
        throw "Composer no encontrado"
    }
} catch {
    Write-Host "[ERROR] Composer no esta instalado" -ForegroundColor Red
    Write-Host "Por favor instala Composer desde https://getcomposer.org/download/" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar Node.js
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Node.js encontrado" -ForegroundColor Green
    } else {
        throw "Node.js no encontrado"
    }
} catch {
    Write-Host "[ERROR] Node.js no esta instalado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configurando Backend (Laravel)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

Write-Host "Instalando dependencias de PHP..." -ForegroundColor Yellow
composer install --ignore-platform-reqs

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Fallo la instalacion de dependencias PHP" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "Copiando archivo de configuracion..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Copy-Item ".env.example" ".env"
    Write-Host "[OK] Archivo .env creado" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Archivo .env.example no encontrado" -ForegroundColor Yellow
}

Write-Host "Generando clave de aplicacion..." -ForegroundColor Yellow
php artisan key:generate

Write-Host "Ejecutando migraciones..." -ForegroundColor Yellow
php artisan migrate

Write-Host "[OK] Backend configurado exitosamente!" -ForegroundColor Green
Write-Host ""

Set-Location ..

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configurando Frontend (React)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

Write-Host "Instalando dependencias de Node.js..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Fallo la instalacion de dependencias Node.js" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "[OK] Frontend configurado exitosamente!" -ForegroundColor Green
Write-Host ""

Set-Location ..

Write-Host "========================================" -ForegroundColor Green
Write-Host "Configuracion Completada!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Para iniciar el proyecto:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Backend (Laravel):" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor White
Write-Host "   php artisan serve" -ForegroundColor White
Write-Host ""
Write-Host "2. Frontend (React) - En otra terminal:" -ForegroundColor Yellow
Write-Host "   cd frontend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "URLs:" -ForegroundColor Cyan
Write-Host "- Backend API: http://localhost:8000" -ForegroundColor White
Write-Host "- Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "¡Disfruta usando WeAreContent!" -ForegroundColor Green
Write-Host ""
Read-Host "Presiona Enter para salir"
