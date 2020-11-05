import sys;
import os;
import json;
from datetime import date, datetime
import pathlib

def launchZoom(id, password):
    os.system('start "" "zoommtg://zoom.us/join?confno=' + id + '&pwd=' + password + '"')

if(len(sys.argv) <= 1):
    raise Exception('No schedule config file provided in the command line :(');

if(not os.path.exists(sys.argv[1])):
    raise Exception('Could not find file ' + sys.argv[1] + '.')

print('loading file: ' + sys.argv[1])

with open(sys.argv[1]) as f:
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
