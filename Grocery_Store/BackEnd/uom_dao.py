from sql_connection import get_sql_connection

def get_uoms(connection):
    
    cursor = connection.cursor()
    query = "SELECT uom.uom_id, uom.um_name FROM uom"
    cursor.execute(query)

    response = []
    
    for (uom_id, um_name) in cursor:
      response.append({
        'uom_id' : uom_id, 
        'um_name' : um_name, 
      })
    
    return response


if __name__ == '__main__':
    connection = get_sql_connection()
    if connection:
       try:
            print(get_uoms(connection))
       finally:
            connection.close()
