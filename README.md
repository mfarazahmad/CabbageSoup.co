# Welcome to CabbageSoup!

## A professional ecommerce service and business landing site.

![](CabbageSoup.png)

## Coming Soon v2.1
- Oauth2 Integration w/ Google
- Moving Product Images from Linode Server to Amazon S3
- Better Error Handling via Status Codes (401, 403 etc.)
- Replacing Binary Search with Elastic for Text & Voice Search
- Creating Machine Learning Recommendations
    - Top Categories
    - Recommended Products
    - What you will buy next
- Adding Redis Cacheing for Large Product Payloads

## Services
- Services Broken into a Domain Driven Microservices Architecture 
    - **python**
        - service-demo-backend
        - service-auth
        - service-history
        - service-products
        - service-customer
    - **node/typescript**
        - service-notification
        - service-email

Service-History has a CQRS (Command-Query Responsbility Segregation) Architecture to Seperate Read & Writes operations for better scalability. An event bus via RabbitMQ is used for sync across the write to read database.

- Responsive, Interactive UI to Showcase Professional Experience (ui-demo.cabbagesoup.co)
    - React
    - HTML5 Canvas
    - Media Queries
    - Grid/Flexbox
    - Antd Design
    - Webp Image Formats
    
## Technologies
- Containerization via Docker & Managed by Kubernetes & Helm Charts
- Isitio leveraged as API Gateway for Load Balancing
- Isitio used as Service Mesh for service discovery
- Deployed on Amazon EKS via Terraform
- Pipeline Orchestrator via Harness w/ Sonarcube Integration
- Utilizing Redis for Cacheing of Product Data
- Sensitive Configuration stored/ retrieved in Hasicorp Vault
- MongoDB Cluster Sharding w/ 3 nodes
- Logging using Datadog
- 100% Code Coverage
- Linters used: 
- Passwords are hashed using a Argon2id hash function using Blake2.

## Local Setup

Install Local Library
```
cd lib-cspycore
python setup.py install
```

### Languages
```
choco install nodejs
choco install python

```

### Infrastructure
```
choco install aws-cli
choco install docker
choco install terraform
choco install kubernetes-cli
choco install kubernetes-helm
choco install minikube
```

## Running Containers Locally
```
docker run -p 5000:5000 service-demo-backend
docker run -p 5001:5001 service-products
docker run -p 5002:5002 service-customers
docker run -p 5002:5003 service-history
docker run -p 8001:8001 service-auth
docker run -p 3000:3000 ui-demo.cabbagesoup.co
```

### Swagger

### Linter
Linting is utilized to maintain a safe, readable, and consistent coding standard throughout the services.

- flake8 is used as the primary linter for the python services
- eslinter is used as the linter for the node/next.js project