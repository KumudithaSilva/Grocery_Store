from datetime import datetime
from sql_connection import get_sql_connection

def insert_order(connection, order):

    cursor = connection.cursor()

    order_query = ("INSERT INTO orders (customer_name, total, datetime) values (%s, %s, %s)")
    order_data = (order['customer_name'], order['grand_total'], order['datetime'])

    cursor.execute(order_query, order_data)

    connection.commit()


if __name__ == '__main__':
    connection = get_sql_connection()
    print(insert_order(connection, {
        'customer_name' : 'dhaval',
        'grand_total' : '500',
        'datetime' : datetime.now(),
        'order_details' : [
            {
                'product_id' : 1,
                'quantity' : 2,
                'total_price' : 50
            },
            {
                'product_id' : 3,
                'quantity' : 1,
                'total_price' : 30
            }
        ]
    }))