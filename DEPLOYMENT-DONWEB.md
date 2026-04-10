# Guía de Deployment para DonWeb

Este documento contiene las instrucciones para subir el proyecto Aidcom Argentina a DonWeb.

## Requisitos Previos

- Cuenta de DonWeb con plan que soporte Node.js (Cloud Hosting o VPS)
- Node.js 18+ instalado en el servidor
- Acceso SSH o FTP al servidor

## Opción 1: Deployment con Node.js (Recomendado)

### Paso 1: Preparar el Proyecto

1. Asegúrate de que todas las variables de entorno estén configuradas
2. Ejecuta el build localmente para verificar que no hay errores:
   \`\`\`bash
   npm install
   npm run build
   \`\`\`

### Paso 2: Subir Archivos al Servidor

Sube los siguientes archivos y carpetas a tu servidor DonWeb:

- `.next/` (carpeta generada por el build)
- `public/` (archivos estáticos)
- `node_modules/` (dependencias) o instala en el servidor
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `.env.local` (si tienes variables de entorno)

### Paso 3: Configurar en el Servidor

Conéctate por SSH y ejecuta:

\`\`\`bash
cd /ruta/a/tu/proyecto
npm install --production
npm run build
npm start
\`\`\`

### Paso 4: Configurar Process Manager (PM2)

Para mantener la aplicación corriendo:

\`\`\`bash
npm install -g pm2
pm2 start npm --name "aidcom-argentina" -- start
pm2 save
pm2 startup
\`\`\`

### Paso 5: Configurar Nginx (si aplica)

Si DonWeb usa Nginx, agrega esta configuración:

\`\`\`nginx
server {
    listen 80;
    server_name tudominio.com.ar;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

## Opción 2: Deployment Estático (Limitado)

Si solo tienes hosting estático, algunas funcionalidades server-side no funcionarán:

\`\`\`bash
npm run build
\`\`\`

Luego sube la carpeta `out/` generada a tu hosting.

**Nota:** Esta opción NO soporta:
- Server Actions
- API Routes dinámicas
- Funcionalidades que requieren servidor

## Variables de Entorno

Crea un archivo `.env.local` en el servidor con:

\`\`\`env
# Agrega aquí tus variables de entorno si las necesitas
# NEXT_PUBLIC_API_URL=https://api.tudominio.com
\`\`\`

## Troubleshooting

### Error: "Cannot find module"
Ejecuta: `npm install`

### La aplicación no inicia
Verifica: `npm run build` para ver errores de compilación

### Puerto en uso
Cambia el puerto en el comando start: `PORT=3001 npm start`

## Soporte

Para soporte técnico de DonWeb:
- Web: https://www.donweb.com/
- Email: soporte@donweb.com
- Teléfono: 0800-444-3322

## Comandos Útiles

\`\`\`bash
# Ver logs de la aplicación
pm2 logs aidcom-argentina

# Reiniciar la aplicación
pm2 restart aidcom-argentina

# Detener la aplicación
pm2 stop aidcom-argentina

# Ver estado
pm2 status
