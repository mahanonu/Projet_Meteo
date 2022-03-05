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

fs.watch('/dev/shm/rainCounter.log',(eventType,filename)=>{
    fs.readFile('/dev/shm/rainCounter.log','utf8',function(err,data){
        date = new Date(data.slice(0,-2));
        temps = date.getTime();
        influx.writePoints([
            {
              measurement: 'pluie',
              fields: {date: (new Date (temps)).toLocaleString(), value: 1},
            }
        ])
    })
})