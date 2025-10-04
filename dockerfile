# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar solo archivos necesarios para instalación de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias con npm
RUN npm ci --only=production=false

# Copiar el resto del código fuente
COPY . .

# Construir la app (React Router SSR)
RUN npm run build

# Etapa 2: Producción con Node.js
FROM node:20-alpine AS runner

# Crear usuario no root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar solo dependencias de producción (sin scripts de husky)
RUN npm ci --only=production --ignore-scripts

# Copiar el build completo desde la etapa anterior
COPY --from=builder /app/build ./build

# Cambiar a usuario no root
USER appuser

# Configurar el puerto donde el servidor debe escuchar
ENV PORT=8080

# Azure detecta puertos dinámicamente, pero 8080 es estándar
EXPOSE 8080

# Ejecutar el servidor de React Router
CMD ["npm", "start"]