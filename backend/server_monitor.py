import psutil
from pymongo import MongoClient
import datetime
import time
import socket
import subprocess

# MongoDB connection configuration
MONGO_HOST = 'mongodb+srv://shivaniroy1:987C2GLrdSUhQAds@servermonitor.cwqmodg.mongodb.net/?retryWrites=true&w=majority'  # Change this to your MongoDB host
# MONGO_PORT = 27017  # Change this to your MongoDB port
DB_NAME = 'server_monitor'
COLLECTION_NAME = 'server_data'
hostname = socket.gethostname()
# Connect to MongoDB
client = MongoClient(MONGO_HOST)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]


def get_public_hostname():
    try:
        # Run the ec2-metadata command and extract public hostname using awk
        command = "ec2-metadata --public-hostname | awk '{split($0,a,\": \"); print a[2]}'"
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)

        # Remove trailing newline characters from the output
        public_hostname = output.strip()

        return public_hostname
    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return None

def get_public_ip():
    try:
        # Run the ec2-metadata command and extract public hostname using awk
        command = "ec2-metadata --public-ipv4 | awk '{split($0,a,\": \"); print a[2]}'"
        output = subprocess.check_output(command, shell=True, stderr=subprocess.STDOUT, text=True)

        # Remove trailing newline characters from the output
        public_hostname = output.strip()

        return public_hostname
    except subprocess.CalledProcessError as e:
        print("Error:", e.output)
        return None

def get_system_vitals():
    cpu_percent = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory()
    mem_total = round(mem.total/(1024 ** 3), 2)
    mem_used = round(mem.used/(1024 ** 3), 2)
    mem_free = round(mem.free/(1024 ** 3), 2)
    disk = psutil.disk_usage('/')
    disk_total = round(disk.total/(1024 ** 3), 2)
    disk_used = round(disk.used/(1024 ** 3), 2)
    disk_free = round(disk.free/(1024 ** 3), 2)
    timestamp = datetime.datetime.now()

    # Counting the number of active network connections
    connections = psutil.net_connections()
    active_connections = len(connections)

    return {
        'created_ts': timestamp,
        'server': get_public_hostname(),
        'server_ip': get_public_ip(),
        'cpu_percent': cpu_percent,
        'mem_total': mem_total,
        'mem_used': mem_used,
        'mem_free': mem_free,
        'disk_total': disk_total,
        'disk_used': disk_used,
        'disk_free': disk_free,
        'active_connections': active_connections
    }





def store_vitals_in_db(vitals):
    collection.insert_one(vitals)


if __name__ == "__main__":
    vitals_data = get_system_vitals()
    store_vitals_in_db(vitals_data)
    print("Server vitals stored in MongoDB. Active connections:", vitals_data)
