# buyume_test

sample .env content

MONGO_URI = mongodb+srv://localhost:27017/InventoryDB
PORT = 3030

curl to add sample products

curl --location --request POST 'http://localhost:3030/products/addTestProducts'



curl to manipulate product inventory

curl --location --request POST 'http://localhost:3030/products/addOrRemoveInventory' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "productId": "6463596e8f90be285f5c231c",
        "quantity": 10,
        "operation": "add"
    },
    {
        "productId": "6463596e8f90be285f5c231d",
        "quantity": 14,
        "operation": "add"
    },
    {
        "productId": "6463596e8f90be285f5c231e",
        "quantity": 170,
        "operation": "subtract"
    }
]'
