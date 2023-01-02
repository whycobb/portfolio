from redmail import EmailSender
from redmail import gmail
import urllib.request

import json
import requests
import re
import sys




#DNS Update function
def updateDNS():
    print("Updating DNS now...")




oldIP = "0.0.0.0"
try:
    log = open("oldIP.log", "r")
    oldIP = log.read()
    log.close()
except IOError:
    print ("Error: oldIP.log does not exist.")


#newIP = urllib.request.urlopen('https://ident.me').read().decode('utf8')
newIP = getMyIP()
print(newIP)

print("New IP:\t" + newIP)
print("Old IP:\t" + oldIP)

if newIP == oldIP:
    print("IP Addresses match")
else:
    print("IP Addresses differ. Updating...")
    
    log = open("oldIP.log", "w")
    log.write(str(newIP))
    log.close()
    
    updateDNS()
    
    

input('finished')





