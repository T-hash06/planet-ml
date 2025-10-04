# Etapa 1: Build
FROM node:20-alpine AS builder

# Habilitar corepack (ya incluido en Node 20)
RUN corepack enable

WORKDIR /app

# Copiar solo archivos necesarios para instalación de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con pnpm usando corepack
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Construir la app (React Router SSR)
RUN pnpm run build

# Etapa 2: Producción con Node.js
FROM node:20-alpine AS runner

# Habilitar corepack
RUN corepack enable

# Crear usuario no root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar solo dependencias de producción (sin scripts de husky)
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copiar el build completo desde la etapa anterior
COPY --from=builder /app/build ./build

# Cambiar a usuario no root
USER appuser

# Configurar el puerto donde el servidor debe escuchar
ENV PORT=8080

# Azure detecta puertos dinámicamente, pero 8080 es estándar
EXPOSE 8080

# Ejecutar el servidor de React Router
CMD ["pnpm", "start"]
