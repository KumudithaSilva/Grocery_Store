from datetime import datetime
from sql_connection import get_sql_connection

def insert_order(connection, order):

    cursor = connection.cursor()

    order_query = ("INSERT INTO orders (customer_name, total, datetime) values (%s, %s, %s)")
    order_data = (order['customer_name'], order['grand_total'], order['datetime'])

    cursor.execute(order_query, order_data)
    order_id = cursor.lastrowid

    order_details_query = ("INSERT INTO order_details (order_id, product_id, quantity, total_price) values (%s, %s, %s, %s)")
    order_details_data = []


    for order_record in order['order_details']:
        order_details_data.append(
            [
                order_id,
                int(order_record['product_id']),
                float(order_record['quantity']),
                float(order_record['total_price']),

            ]
        )

    cursor.executemany(order_details_query, order_details_data)

    connection.commit()


if __name__ == '__main__':
    connection = get_sql_connection()
    '''print(insert_order(connection, {
        'customer_name' : 'Jeramic',
        'grand_total' : '500',
        'datetime' : datetime.now(),
        'order_details' : [
            {
                'product_id' : 60,
                'quantity' : 2,
                'total_price' : 50
            },
            {
                'product_id' : 63,
                'quantity' : 1,
                'total_price' : 30
            }
        ]
    }))'''