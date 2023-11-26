from sql_connection import get_sql_connection

def get_all_products(connection):
    
    cursor = connection.cursor()
    query = "SELECT products.products_id, products.name, products.uom_id, products.price_per_unit, uom.um_name FROM products inner join uom on products.uom_id = uom.uom_id;"
    cursor.execute(query)

    response = []
    
    for (products_id, name, uom_id, price_per_unit, uom_name) in cursor:
      response.append({
        'products_id' : products_id, 
        'name' : name, 
        'uom_id' : uom_id, 
        'price_per_unit' : price_per_unit, 
        'uom_name' : uom_name
      })
    
    return response


if __name__ == '__main__':
    connection = get_sql_connection()
    if connection:
        try:
            print(get_all_products(connection))
        finally:
            connection.close()
