//Influx
const Influx = require('influx');
const http = require('http');
const os = require('os');

//Express
var express = require('express');
const { response } = require('../app');
var router = express.Router();

const listMeasure = {'temperature':'temperature',
    'hygrometry':'hygrometrie',
    'pressure':'pression',
    'rainfall':'precipitation',
    'brightness':'luminosite',
    'winddirection':'vent_direction',
    'windvelocity':['vent_max','vent_moy','vent_min'],
    'gpsposition':['N','E']
}

/* GET users listing. */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    //Creata an influx client using default db (express_response_db) for now
    const influx = createInfluxClient()
  
  });

router.get('/:measure', function(req, res, next) {
    let listParam = req.params['measure'].split(',').map(elem => elem.toLowerCase());
    //Creata an influx client using default db (express_response_db) for now
    //Creata an influx client using default db (express_response_db) for now
    const influx = createInfluxClient();

    let valeurs = {};
    let allPromises = [];
    listParam.forEach(param => {
        valeurs[param] ={'Date':[],'Values':[]};
        allPromises.push(
        influx.query(
            `select * from ${listMeasure[param]}`
        ))
    });

    Promise.all(allPromises)
    .then(promises => {
        i=0
        promises.forEach(results=>{
            
            // console.log(results);
            for (let index = 0; index < results.length; index++) {
                console.log(results[index])
                valeurs[listParam[i]]['Values'].push(results[index].value);
                valeurs[listParam[i]]['Date'].push(results[index].time._nanoISO);
            }
            i+=1;
            })
            res.send(valeurs);
    })
    
    });

    // .then(results => {
    //     
    

function createInfluxClient(){
    const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'meteoBase',
    })
    return influx;
}

module.exports = router;