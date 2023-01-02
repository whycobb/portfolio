#!/bin/bash
#launches python
#PYTHONPATH=/home/pi/.local/lib/python3.7/site-packages python3 /home/pi/portfolio/wakeup.py

sleep 15

PYTHONPATH=/home/pi/.local/lib/python3.7/site-packages python3 DNSupdate.py pb_keys.json yorickc.com

echo "DNS updated"
echo "running server:"

node ws.js

echo "finished"
