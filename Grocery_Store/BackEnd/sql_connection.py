import os
import mysql.connector
from dotenv import load_dotenv
from mysql.connector import errorcode

load_dotenv('Grocery_Store/DataBase/connection.env')

config = {
    "host": "127.0.0.1",
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME"),
}

__cnx = None

def get_sql_connection():
  global __cnx
  if __cnx is None:
    try:
      __cnx = mysql.connector.connect(**config)
      return __cnx
    except mysql.connector .Error as err:
      if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
      elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
      else:
        print(err)