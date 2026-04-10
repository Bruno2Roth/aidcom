#!/bin/bash

# Script de deployment para DonWeb
# Este script automatiza el proceso de build y deployment

echo "=== Aidcom Argentina - Deployment Script ==="
echo ""

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado"
    exit 1
fi

echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo ""

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Build del proyecto
echo ""
echo "🔨 Compilando proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build"
    exit 1
fi

echo ""
echo "✅ Build completado exitosamente"
echo ""
echo "Para iniciar la aplicación ejecuta:"
echo "  npm start"
echo ""
echo "O con PM2:"
echo "  pm2 start npm --name 'aidcom-argentina' -- start"
echo ""
