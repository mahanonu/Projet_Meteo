import os 
from time import sleep
from datetime import datetime
import json 

interval= 30
dataJsonPath = "/dev/shm/dataJson.json"


with open("/dev/shm/gpsNmea") as file:
    data = file.readlines()
    N,E = data[0].split(",")[2], data[0].split(",")[4]
    
with open("/dev/shm/tph.log") as file:
    data = file.read()
    tphJson = json.loads(data)
