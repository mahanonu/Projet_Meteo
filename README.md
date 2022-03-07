# Projet_Meteo

Welcome to the git of our meteo Dashboard. You can find it at : http://piensg028:8080/

## AppSave and AppRain

Two Nodejs apps are implemented in our meteosensors in order to retrieve and save the data generated.

AppSave will take care of every data exept the rainCounter.log. It is automatised by a appSave.service wich calls for the Nodeapp. The app will read and save the last data generated by our captors. appSave.service is launched every minute by appSave.timer.

AppRain is a Nodeapp that listen to the rainCounter.log file and write its content everytime it is updated. It is simply called by appRain.service wich launches it when our Raspeberry boot.

All our data is stored in influxDB tables.

## AppSonde

To deliver the data from any station to any dashboard, we need to code APIs with common terminology. For this we agreed on some rules.

AppSonde is an express app which reads our database and exposes its content to specific addresses such as : `piensg028:8080data/temperature`

## DashBoard 

The dashboard is composed of 3 pages:<br>
- a Dashboard Sondes page where you can see data of several stations and compare it through charts
- a Sonde page where you can choose to see data of a specific station
- a Map page where you can see where our meteo stations are localised.

We deploy our dashboard by building it with `npm run build` and adding it to the appSonde in a dedicated url.
