const morgan = require('morgan')
let express = require('express');
let redis = require('redis');
const cors = require('cors');
const bodyParser = require('body-parser');

let redisClient = redis.createClient(6379, "redis3");
let app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ extended: true }));
app.use(cors({
    origin:'*'
}));
app.use(bodyParser.json());
app.use(morgan('dev'))

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

app.listen(4040, function(){
    console.log('Aplicación ejemplo, escuchando el puerto 4040!');
})
console.log('Conectado a Redis Server');
    redisClient.on('connect', function(){
});

redisClient.geoadd("cervecerias",-32.480575,-58.2361143, "Drakkar", -32.4799457, -58.2375203, "7 Colinas");

redisClient.geoadd("facultades", -32.479084,-58.2356481, "UADER FCyT", -32.4958, -58.2318001, "UTN");

redisClient.geoadd("farmacias", -32.4778867,-58.2398107, "Farmacia Yrigoyen",  -32.4807282, -58.2357882, "Farmacia Entre Ríos");

redisClient.geoadd("centroSalud", -32.4812832, -58.2632772,"Hospital Urquiza", -32.4834228, -58.2324678, "Clinica Uruguay");

redisClient.geoadd("supermercados", -32.4891777, -58.2324794, "Gran Rex", -32.4863167, -58.2326263,"Supremo" );


redisClient.georadius("cervecerias", -32.479371, -58.231429, 5, "km", "withdist", (err, values) =>{
    console.log(values)
})

app.post('/cargar', (req, res)=>{
    try{
        const {grupoInteres, lugar, latitud, longitud} = req.body 
        redisClient.geoadd(grupoInteres, latitud, longitud, lugar)
        res.send("Carga OK")
    }
    catch(err){
        console.log(err)
    }
});

app.get('/radio/:grupoInteres/:latitud/:longitud', (req, res)=>{
    try{
        const {grupoInteres, latitud, longitud} = req.params;
        redisClient.georadius(grupoInteres, latitud, longitud, 5, "km", "withdist", (err, values) =>{
            res.send(JSON.stringify(values))
        })
    }
    catch(err){
        console.log(err)
    }
})


/*
app.get('/radio', (req, res)=>{
    let lugares;
    try{
        const {latitud, longitud} = req.body;
        const grupos = ["cervecerias", "facultades", "farmacias", "centroSalud", "supermercados"]
        grupos.forEach(element => {
            redisClient.georadius(element, latitud, longitud, 5, "km", "withdist", (err, values) =>{
                lugares = [values]
                for (let i = 0; i < lugares.length; i++) {
                    res.send(lugares[i])
                }
            })
        });
    }
    catch(err){
        console.log(err)
    }
})
*/
