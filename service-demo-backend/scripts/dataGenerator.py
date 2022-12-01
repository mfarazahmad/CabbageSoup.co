import os, platform, random, csv, requests, json, traceback, time
from datetime import datetime
from faker import Faker
from dotenv import load_dotenv
from PIL import Image

# Take environment variables from .env.
dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

fake = Faker()

def saveDataToDB(db):
    # Import Excel Data
    with open('./scripts/sample_data/auth.csv', mode='r', encoding="utf-8-sig") as csv_auth, open('./scripts/sample_data/purchase_history.csv', mode='r', encoding="utf8") as csv_history, open('./scripts/sample_data/customers.csv', mode='r', encoding="utf8") as csv_customers, open('./scripts/sample_data/products.csv', mode='r', encoding="utf8") as csv_inventory:
        auth = csv.DictReader(csv_auth)
        orders = csv.DictReader(csv_history)
        inventory = csv.DictReader(csv_inventory)
        customers = csv.DictReader(csv_customers)

        authentication = []
        products = []
        clients = []
        history = []

        for order in orders:
            history.append(order)

        for product in inventory:
            products.append(product)

        for customer in customers:
            clients.append(customer)

        for login in auth:
            authentication.append(login)

        print('Connecting To DB')

        collection = db.connect('auth')
        result = collection.insert_many(authentication)

        collection = db.connect('products')
        result = collection.insert_many(products)

        collection = db.connect('customers')
        result = collection.insert_many(clients)

        collection = db.connect('history')
        result = collection.insert_many(history)

        print('Finished Saving Data to DB')

def imageGenerator(searchTerm, page=1):
    tic = time.perf_counter()
    apiKey = os.environ.get("PIXEL_BAY_API_KEY")
    image_names = []

    try:
        r = requests.get(f'https://pixabay.com/api/?key={apiKey}&q={searchTerm}&page={page}&per_page=50')
        data = r.json()
        images = data['hits']

        print(f'Remaining Calls: {r.headers["X-RateLimit-Remaining"]} \n Total Hits: {data["totalHits"]} \n Total Found: {data["total"]}')
        print(len(images))

        for image in images:
            # Reduce Image Quality by 30% for Performance
            imgURL = image['webformatURL']
            r2 = requests.get(f'https://api.resmush.it/ws.php?img={imgURL}&qlty=70')
            optimizedImg = r2.json()
            optimizedImg['tags'] = image["tags"]
            print(f'Converted Size: {optimizedImg["dest_size"]} \nSource Size: {optimizedImg["src_size"]}')

            image_names.append(imgWriter(optimizedImg))

        toc = time.perf_counter()
        print(f"Downloaded the images in {toc - tic:0.4f} seconds")

        return image_names

    except Exception as e:
        print(f'Could not complete search for {searchTerm}!')
        print(e)
        print(traceback.format_exc())

def imgWriter(image): 
    try:
        # Download a new image
        imgURL = image['dest']
        response = requests.get(imgURL)
        base_name = f'img_{image["tags"][0:3]}_product{random.randint(0, 13459)}'
        jpg_name = base_name + '.jpg'
        webp_name = base_name + '.webp'

        if 'Linux' in platform.platform():
            completeName = os.path.join('/var/www/static', jpg_name)
            webpPathName = os.path.join('/var/www/static', webp_name)
        else:
            completeName = f'./scripts/downloads/{jpg_name}'
            webpPathName = f'./scripts/downloads/{webp_name}'

        print(f'Writing jpg image {jpg_name}')
        file = open(completeName, "wb")
        file.write(response.content)
        file.close()

        print(f'Writing webp image {webp_name}')
        im = Image.open(completeName).convert("RGB")

        im.save(webpPathName, "webp", optimize=True, quality=90)

        return webp_name

    except Exception as e:
        print("Could not download image!")
        print(e)
        print(traceback.format_exc())


# TODO: Encrypt Card Info
def generateCustomers(amount):
    customers = []

    for i in range(amount):
        new_profile = {}

        firstName = fake.first_name() 
        lastName = fake.last_name()
        last_seen = fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None)
        date_time = last_seen.strftime("%m/%d/%Y, %H:%M:%S")
        genders = ['male', 'female']
        hair_types = ['curly', 'straight', 'wavy', 'n/a']

        # Identity
        new_profile['user_id'] = firstName[0].lower() + lastName[0:3].lower() + str(fake.random_int(min=0, max=549))
        new_profile['name'] = f'{firstName} {lastName}'
        new_profile['age'] = str(fake.random_int(min=16, max=72))
        new_profile['gender'] = genders[random.randint(0, 1)]
        new_profile['hair_type'] = hair_types[random.randint(0, 3)]
        
        # Contact Info
        new_profile['phone_number'] = fake.unique.phone_number()
        new_profile['email'] = fake.unique.email()
        new_profile['street'] = fake.unique.street_address()
        new_profile['city'] = fake.city()
        new_profile['state'] = fake.state()
        new_profile['zip'] = fake.postcode()

        # Financial Details
        new_profile['credit_type'] = fake.credit_card_provider()
        new_profile['name_on_card'] = f'{firstName} {lastName}'
        new_profile['credit_card_number'] = fake.credit_card_number()
        new_profile['credit_exp_date'] = fake.credit_card_expire()
        new_profile['credit_security_code'] = fake.credit_card_security_code()

        # Misc. Details
        new_profile['last_known_location'] = fake.timezone()
        new_profile['last_seen_on'] = date_time
        new_profile['customer_tier'] = 'n/a'
        
        customers.append(new_profile)
        print(f'New Customer Generated: {new_profile}')
    
    print(len(customers))

    print(f'Generating Customer File')

    # Export to Excel
    with open('./scripts/sample_data/customers.csv', 'w', newline='', encoding="utf8") as writerFile:
        fieldNames = ['user_id', 'name', 'age', 'gender', 'hair_type', 'phone_number', 'email', 'street', 'city', 'state', 'zip', 'credit_type', 'name_on_card', 'credit_card_number', 'credit_exp_date', 'credit_security_code', 'last_known_location', 'last_seen_on', 'customer_tier']
        csv_writer = csv.DictWriter(writerFile, fieldnames=fieldNames)

        csv_writer.writeheader()
        for new_profile in customers:
            csv_writer.writerow(new_profile)

def generateInventory():
    categories = ['Lipstick', 'Shampoos', 'Conditioner', 'Face Care', 'Hairstyling', 'Accessories']
    ratings = [i for i in range(1,6)]
    image_names = []

    searchTerms = ['Products', 'Bottle', 'Cosmetics']
    for searchTerm in searchTerms:
        for page in range(1,3):
            image_names += imageGenerator(searchTerm, page)
            print(f'Number of Image Names: {len(image_names)}')

    print(f'Generating Inventory File')

    # Import Excel Data
    with open('./scripts/sample_data/inventory.csv', mode='r', encoding="utf8") as csv_file, open('./scripts/sample_data/products.csv', 'w', newline='', encoding="utf8") as writerFile:
        fieldNames = ['product_id', 'product_category', 'product_brand', 'product_name', 'img', 'rating', 'description', 'price', 'quantity']
        csv_reader = csv.DictReader(csv_file)
        csv_writer = csv.DictWriter(writerFile, fieldnames=fieldNames)
        products = []

        csv_writer.writeheader()
        for row in csv_reader:
            row['rating'] = ratings[random.randint(0, 4)]
            row['product_category'] = categories[random.randint(0, 4)]
            row['price'] = round(random.uniform(4.99, 76.99), 2)
            row['quantity'] = random.randint(0, 99)
            row['img'] = image_names[random.randint(0, len(image_names)-1)]
            csv_writer.writerow(row)
            products.append(row)

        print(len(products))
        print(products[1])

def generateOrderHistory():
    tic = time.perf_counter()
    order_status = ['Shipped', 'Preparing']
    shipping_status = ['In Transit', 'Canceled', 'Done']

    # Import Excel Data
    with open('./scripts/sample_data/history.csv', mode='r', encoding="utf8") as csv_file,  open('./scripts/sample_data/purchase_history.csv', 'w', newline='', encoding="utf8") as writerFile, open('./scripts/sample_data/customers.csv', mode='r', encoding="utf8") as csv_customers, open('./scripts/sample_data/products.csv', mode='r', encoding="utf8") as csv_inventory:
        fieldNames = ['order_date','product_id','product_category','product_brand','product_name','price','user_id','order_number','order_status','shipping_status']
        orders = csv.DictReader(csv_file)
        inventory = csv.DictReader(csv_inventory)
        customers = csv.DictReader(csv_customers)
        csv_writer = csv.DictWriter(writerFile, fieldnames=fieldNames)

        uniqueTransactions = set()
        products = []
        clients = []
        history = []

        for order in orders:
            history.append(order)
            uniqueTransactions.add(order['order_number'])

        for product in inventory:
            products.append(product)

        for customer in customers:
            clients.append(customer)
        
        records = {}
        for transaction in uniqueTransactions:
            records[transaction] =  {
                'shipping_status': shipping_status[random.randint(0, 2)],
                'order_status': order_status[random.randint(0, 1)],
                'user_id': clients[random.randint(0, len(clients)-1)]['user_id']
            }
        print(f'Number of Unique Transactions: {len(uniqueTransactions)}')

        csv_writer.writeheader()
        for order in history:
            product = products[random.randint(0, len(products)-1)]
            transaction = order['order_number']

            order['product_id'] = product['product_id']
            order['img'] = product['img']
            order['product_category'] = product['product_category']
            order['product_brand'] = product['product_brand']
            order['product_name'] = product['product_name']
            order['price'] = product['price']
            order['order_status'] = records[transaction]['order_status']
            order['shipping_status'] = records[transaction]['shipping_status']
            order['user_id'] = records[transaction]['user_id']

            #print(order)
            csv_writer.writerow(order)

    toc = time.perf_counter()
    print(f"Created all order history in {toc - tic:0.4f} seconds")

