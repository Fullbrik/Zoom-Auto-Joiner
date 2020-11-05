# Zoom-Auto-Joiner
Automatically join zoom classes

How it works:
* Create a json file on your computer and format it as so: 

```
{
    "day (sunday, monday etc.)": [
        {
            "time": "The time the class takes place in army time (eg. 7:00, 13:10)",
            "class": "The name of the class",
            "id": "The id of the zoom room",
            "password": "The hashed password of the zoom room (The kind at the end of the link)"
        }
    ]
}
```
* Launch autojoiner.py with the schedule config file as the command line argument:

```
autojoiner.py path/to/file.json
```