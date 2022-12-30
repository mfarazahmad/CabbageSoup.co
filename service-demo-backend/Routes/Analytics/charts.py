import requests, traceback
from flask import Flask, Blueprint, jsonify, session, request
from flask_cors import CORS
import statistics

from routes.Analytics import Analytics, db

@Analytics.route('/map', methods=['GET'])
def mapChart():
    collection = db.connect('customers')
    customers_states = []
    state = request.args.get('state').title()
    states = collection.find({"state": state})
    for state in states:
        del state['_id'] 
        customers_states.append(state)
    
    length = len(customers_states)
    print(length)

        
        
    return jsonify(length)

@Analytics.route('/total-sales', methods=['GET'])
def totalSales():
    collection = db.connect('history')
    orders_array = []
    order_date = request.args.get('order_date')
    orders = collection.find({"order_date": {"$regex": order_date}})
    order_count = 0 
    print(sum(orders_array))
    
    for order in orders:
        del order['_id']
        order_price = int(float(order['price']))
        orders_array.append(order_price)
        order_count += 1
    print(orders_array)
    average_order = round(statistics.mean(orders_array),2)
    total_order = {'total_sales': sum(orders_array), "order_count": order_count, "average_order": average_order}
   
    return jsonify(total_order)