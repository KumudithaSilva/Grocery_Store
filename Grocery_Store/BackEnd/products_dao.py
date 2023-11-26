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


def insert_products(connection, products):
   
   cursor = connection.cursor()
   query = "INSERT INTO products (`name`, `uom_id`, `price_per_unit`) VALUES (%s, %s, %s);"

   data = (products['name'], products['uom_id'], products['price_per_unit'])
   cursor.execute(query, data)
   connection.commit()


def update_products(connection, products):
   
   cursor = connection.cursor()
   query = "UPDATE products SET name=%s, uom_id=%s, price_per_unit=%s WHERE products_id=" + str(products['id'])

   data = (products['name'], products['uom_id'], products['price_per_unit'])
   cursor.execute(query, data)
   connection.commit()


def delete_products(connection, product_id):
   
   cursor = connection.cursor()
   query = "DELETE FROM products WHERE products_id=" + str(product_id)

   cursor.execute(query)
   connection.commit()
    


if __name__ == '__main__':
    connection = get_sql_connection()
    if connection:
       try:
            print(get_all_products(connection))
       finally:
            connection.close()

    #(update_products(connection, {
    #   'id': 4,
    #   'name' : 'cabbage',
    #   'uom_id' : '1',
    #   'price_per_unit' : '100'
    #}))
