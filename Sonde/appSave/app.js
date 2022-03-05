const nmea = require('@drivetech/node-nmea');
var Influx = require('influx');
var path = require('path');
var fs = require('fs');

const { resolve } = require('path');
const { rejects } = require('assert');
const { timeStamp, time } = require('console');


const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'meteoBase'
})

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('meteoBase')) {
      return influx.createDatabase('meteoBase');
      console.log('a')
    }
  })
  .catch(err => {
    console.error(`Error creating Influx database!`);
  })


  
function readtph(){
  return new Promise((resolve,rejects)=>{
    fs.readFile('/home/formation/Bureau/donnee_meteo/shm/tph.log', 'utf8',function (err,data) {
      data = JSON.parse(data);
      date = data['date'];
      date = new Date(date);
      temps = date.getTime();
      influx.writePoints([
          {
            measurement: 'temperature',
            fields: {date: temps, value: data['temp']},
          }
      ])
      influx.writePoints([
        {
          measurement: 'hygrometrie',
          fields: {date: temps, value: data['hygro']},
        }
    ])
    influx.writePoints([
      {
        measurement: 'pression',
        fields: {date: temps, value: data['press']},
      }
    ])
    resolve(temps);
  });
  })
  
}

readtph().then((temps)=>{
  fs.readFile('/home/formation/Bureau/donnee_meteo/shm/sensors', 'utf8',function (err,data) {
    data = JSON.parse(data);
    influx.writePoints([
      {
        measurement: 'luminosite',
        fields: {date: temps, value: data['measure'][3]['value']},
      }
    ])
    influx.writePoints([
      {
        measurement: 'vent_direction',
        fields: {date: temps, value: data['measure'][4]['value']},
      }
    ])
    influx.writePoints([
      {
        measurement: 'vent',
        fields: {date: temps, 
                  vent_moy: data['measure'][5]['value'], 
                  vent_max: data['measure'][6]['value'],
                  vent_min: data['measure'][7]['value']}
      }
    ])
  })
  fs.readFile('/home/formation/Bureau/donnee_meteo/shm/gpsNmea','utf8',function (err,rawData) {
    const data = nmea.parse(rawData);
    data = data.split(',');
    influx.writePoints([
      {
        measurement: 'GPS',
        fields: {date: temps, nord: data.loc['coordinates'][0], est: data.loc['coordinates'][1]},
      }
    ])
  })
})

