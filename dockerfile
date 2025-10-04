# Imagen ligera solo para servir el build
FROM node:20-alpine

WORKDIR /app

# Copiamos el resultado del build (generado por GitHub Actions)
COPY build ./build

# Instalar serve para servir el contenido estático
RUN npm install -g serve

ENV PORT=8080
EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]
