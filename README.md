# Zoom-Auto-Joiner
Automatically join zoom classes

How it works:
* Create a data folder in the root directory (next to src).
* Put a test-classes.json file in it.
* Format it as so (in json format): 

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