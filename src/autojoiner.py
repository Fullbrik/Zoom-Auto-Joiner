import os;
import json;
from datetime import date, datetime
import pathlib

def launchZoom(id, password):
    os.system('start "" "zoommtg://zoom.us/join?confno=' + id + '&pwd=' + password + '"')

with open(str(pathlib.Path(__file__).parent.absolute()) + "\\..\\data\\test-classes.json") as f:
    data = json.load(f)

lastJoinedTime = ""

def joinTodaysZoom():
    global lastJoinedTime

    weekday = date.today().strftime('%A').lower()
    now = datetime.now()
    time = now.strftime('%H:%M')

    for clss in data[weekday]:
        if(clss["time"] == time and lastJoinedTime != time):
            lastJoinedTime = time
            print("Joining class")
            launchZoom(clss["id"], clss["password"])
    
while 1:
    joinTodaysZoom()
