// importamos las librerias importantes
const express = require('express')
const cors = require('cors')
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
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

// indicamos que usaremos un router
app.get('/', function (req, res) {
	res.send("Microservicio que se comunica con ToneAnalyzer");
});

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    	apikey: process.env.API_KEY,
  }),
  serviceUrl: process.env.URL_TEXT_ANALYZER,
});

// indicamos que usaremos un router
app.post('/analize-text', function (req, res) {

  const text = req.body.text;

  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
  };

  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      console.log(JSON.stringify(toneAnalysis, null, 2));
      res.send(toneAnalysis.result);
    })
    .catch(err => {
      console.log('error:', err);
      res.send(err);
    });	
});


// iniciamos nuestro server
app.listen(PORT,HOST, () => { console.log(`Server listening on port ${PORT} and host ${HOST}`); })