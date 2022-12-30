import traceback, json, gzip
from flask import jsonify, request, session

from routes.Search import Search, db
from utils.algorithms.searching import linearSearch, binarySearch

# TODO: Add in Binary Search Logic
@Search.route('/', methods=['GET'])
def search():

    # Search Details
    searchTerms = request.args.get('term', None)
    searchTerms = searchTerms.split()
    searchType = request.args.get('type', None)
    searchFilter = request.args.get('filter', None)
    
    if searchFilter:
        filter = searchFilter.split(',')
        searchFilter = {}
        for item in filter:
            filterTypes = item.split(':')
            searchFilter.update({filterTypes[0]:filterTypes[1]})
    print(searchFilter)
    print(searchTerms)

    # Check Session to see if data is already retreived
    searchData = session.get('search', None)

    if searchData and searchType in searchData:
        db_data = searchData[searchType]
    else:
        # Set default search
        if not searchType:
            collection = db.connect('products')
            default_sort_key = 'product_name'
        else:
            # Retrieve all data
            collection = db.connect(searchType)
            
        db_data = []
        for document in collection.find():
            del document['_id']
            db_data.append(document)
            #Sessions aren't working cross-origin
            #session['search'] = {searchType: db_data}

        # Set Default Key to Sort Data By
        if searchType == 'products':
            default_sort_key = 'product_name'
        elif searchType == 'history':
            default_sort_key = 'product_name'
        elif searchType == 'customers':
            default_sort_key = 'product_name'

    sortKey = request.args.get('sortKey', default_sort_key)

    try:
        #data = binarySearch(db_data, sortKey, searchTerms, searchFilter)
        data = linearSearch(db_data, searchTerms, searchFilter)
        #print(data)
        print(len(db_data))
        print(len(data))

        msg = f'Found {len(data)} items!'
        error = ''
    except Exception as e:
        print(traceback.format_exc())
        error = str(e)
        msg = 'Failed to find Data!'
        data = None
    
    return jsonify({'data': data, 'msg': msg, 'err':error})  