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
    'rainfall':'pluie',
    'brightness':'luminosite',
    'winddirection':'vent_direction',
    'windvelocity':'vent',
    'gpsposition':'GPS'
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
        valeurs[param] ={'date':[],'value':[]};
        allPromises.push(
        influx.query(
            `select * from ${listMeasure[param]} GROUP BY * ORDER BY DESC LIMIT 1`
        ))
    });

    Promise.all(allPromises)
    .then(promises => {
        i=0
        promises.forEach(results=>{
            if (listParam[i]=='windvelocity'){
                for (let index = 0; index < results.length; index++) {
                    valeurs[listParam[i]]['value'].push({'min':results[index].vent_min,'avg':results[index].vent_moy, 'max':results[index].vent_max});
                    valeurs[listParam[i]]['date'].push((new Date (results[index].date)).toISOString());
                }
            }
            else if (listParam[i]=='gpsposition'){
                for (let index = 0; index < results.length; index++) {
                    valeurs[listParam[i]]['value'].push({'lon':results[index].nord,'lat':results[index].est});
                    valeurs[listParam[i]]['date'].push((new Date (results[index].date)).toISOString());
                }
            }
            else{
                for (let index = 0; index < results.length; index++) {
                    valeurs[listParam[i]]['value'].push(results[index].value);
                    valeurs[listParam[i]]['date'].push((new Date (results[index].date)).toISOString());
                }
            }
            
            i+=1;
            })
            res.send(valeurs);
    })
    
    });   


    router.get('/:measure/:date', function(req, res, next) {
        console.log('salut');
        let listParam = req.params['measure'].split(',').map(elem => elem.toLowerCase());
        let listDate = req.params['date'].split(',');

        //Creata an influx client using default db (express_response_db) for now
        //Creata an influx client using default db (express_response_db) for now
        const influx = createInfluxClient();

        let dateDebut = new Date(listDate[0]).getTime();
        let dateFin = Date.now();
        console.log(dateFin);
        console.log(dateDebut);
        
        if (listDate.length == 2) {
            dateFin = new Date(listDate[1]).getTime();
        }
        console.log(dateFin);
        let valeurs = {};
        let allPromises = [];
        listParam.forEach(param => {
            valeurs[param] ={'date':[],'value':[]};
            allPromises.push(
            influx.query(
                `select * from ${listMeasure[param]} where date>${dateDebut} and date<=${dateFin}`
            ))
        });
    
        Promise.all(allPromises)
        .then(promises => {
            i=0
            promises.forEach(results=>{
                if (listParam[i]=='windvelocity'){
                    for (let index = 0; index < results.length; index++) {
                        valeurs[listParam[i]]['value'].push({'min':results[index].vent_min,'avg':results[index].vent_moy, 'max':results[index].vent_max});
                        valeurs[listParam[i]]['date'].push((new Date (results[index].date)).toISOString());
                    }
                }
                else if (listParam[i]=='gpsposition'){
                    for (let index = 0; index < results.length; index++) {
                        valeurs[listParam[i]]['value'].push({'lon':results[index].est,'lat':results[index].nord});
                        valeurs[listParam[i]]['date'].push((new Date (results[index].date)).toISOString());
                    }
                }
                else{
                    for (let index = 0; index < results.length; index++) {
                        valeurs[listParam[i]]['value'].push(results[index].value);
                        valeurs[listParam[i]]['date'].push((new Date (results[index].date)).toISOString());
                    }
                }
                
                i+=1;
                })
                res.send(valeurs);
        })
        
        });
    

function createInfluxClient(){
    const influx = new Influx.InfluxDB({
        host: 'localhost',
        database: 'meteoBase',
    })
    return influx;
}

module.exports = router;