FROM node:12-alpine
# creamos una variable
ARG PORT=8080
# label para agregar metadatos
LABEL autor="Jorge Alejandro Dong Llauger"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
# exponemos el puerto
EXPOSE ${PORT}
CMD ["node","index.js"]