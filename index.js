// importamos las librerias importantes
const express = require('express')
const cors = require('cors')
const fs = require('fs');


require('dotenv').config();

// de express nos traemos lo necesario
const { json, urlencoded } = express

// creamos nuestra app
const app = express()

// definimos un puerto por el cual escucharemos peticiones
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"

// configuraciones para nuestro server
app.use(json())
app.use(urlencoded({ extended: false }))
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))


http.createServer(handleRequest).listen(8000);
