import mysql.connector
from mysql.connector import errorcode

config = {
    "host": "127.0.0.1",
    "user": "root",
    "password": "qazQAZwsx@1212",
    "database": "grocery_store",
}

try:
    cnx = mysql.connector.connect(**config)

except mysql.connector .Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
else:
  cnx.close()