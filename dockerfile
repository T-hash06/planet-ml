# Imagen ligera para ejecutar React Router SSR
FROM node:20-alpine

WORKDIR /app

# Copiar package.json y lockfile para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm y dependencias de producción (ignorar scripts como husky)
RUN npm install -g pnpm && \
    pnpm install --prod --frozen-lockfile --ignore-scripts

# Copiar el build generado por GitHub Actions (incluye client y server)
COPY build ./build

# Azure Container Apps usa PORT como variable de entorno
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Ejecutar el servidor SSR de React Router usando pnpm
# React Router serve busca los assets en build/client automáticamente
CMD ["pnpm", "exec", "react-router-serve", "./build/server/index.js"]