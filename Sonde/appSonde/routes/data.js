//Influx
const Influx = require('influx');
const http = require('http');
const os = require('os');

//Express
var express = require('express');
var router = express.Router();

const listMeasure = {'temperature':'temperature',
    'hygrometry':'hygrometrie',
    'pressure':'pression',
    'rainfall':'',
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
    console.log(listParam);
    //Creata an influx client using default db (express_response_db) for now
    //Creata an influx client using default db (express_response_db) for now
    const influx = createInfluxClient();

    influx.query(
            `select * from ${listMeasure[listParam[0]]}`
        ).then(results => {
            console.log(results)
            }).catch(err => {
            res.status(500).send(err.stack)
            })
        res.send('respond with a resource');
    });

function createInfluxClient(){
    const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'meteoBase',
    })
    return influx;
}

module.exports = router;