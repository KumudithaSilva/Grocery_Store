from flask import Flask, request, jsonify
import json
import products_dao
import order_dao
import uom_dao
from sql_connection import get_sql_connection

app = Flask(__name__)

connection = get_sql_connection()

# ---------- Products ----------
@app.route('/getproducts', methods=['GET'])
def get_products():

    products = products_dao.get_all_products(connection)
    
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/insertproducts', methods=['POST'])
def insert_products():

    request_payload = json.loads(request.form['data'])

    products = products_dao.insert_products(connection, request_payload)
    response = jsonify({
        'products' : products
        })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/updateproducts', methods=['POST'])
def update_products():

    request_payload = json.loads(request.form['data'])

    products = products_dao.update_products(connection, request_payload)
    response = jsonify({
        'products' : products
        })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/deleteproducts', methods=['POST'])
def delete_products():

    return_id = products_dao.delete_products(connection, request.form['product_id'])
    response = jsonify({
        'product_id' : return_id
        })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

# ---------- Orders -----------
@app.route('/insertorders', methods=['POST'])
def insert_orders():

    request_payload = json.loads(request.form['data'])

    orders = order_dao.insert_order(connection, request_payload)
    response = jsonify({
        'orders' : orders
        })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


# ---------- UOMS ----------
@app.route('/getuoms', methods=['GET'])
def get_uoms():

    uoms = uom_dao.get_uoms(connection)

    response = jsonify(uoms)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Flask Server for Grocery Store")
    app.run(port=5000)