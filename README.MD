cd ./functions

// To run the project in development mode
 
nmp run dev

// To build the project and run it

npm start

// Routes : 
Orders:

GET http://localhost:4000/api/orders/all , need admin token

GET http://localhost:4000/api/orders/user/:username , need account token, get all the orders from an user

PUT http://localhost:4000/api/orders/:id , need admin token, to update an order status

GET http://localhost:4000/api/orders/:id/details, need account token ,  to verify the details of an order

POST http://localhost:4000/api/orders/ --> used to create an order 
example request body :
{
order :{
	"orderDate": "12/12/20",
	"products": [
		{"id":"wVoNDEwhngLnwxesyKn9","quantity": 5 , "subtotal": 20 },
	 	{"id":"U40eyymyKT0F68DWI6Eo","quantity": 10, "subtotal": 50 }
	],
	"status": "in progress",
	"totalPrice": 70,
	"username": "juan"
},
details :{
	
}

Products :

GET http://localhost:4000/api/products/ --> no parameters, used to get all the products

POST http://localhost:4000/api/products/ --> create a new product
example request body:

{
	"comments": [
	{
		"description":"comment x",
		"raiting": 5
		"username":"juan"
		}
	],
	"info": {
		"description": "product x",
		"name": "px",
		"pathToImg" : ["path1", "path2"];
		"price": 15,
		"stock": 30
	}
}

PUT http://localhost:4000/api/products/:id --> id, body required , used to update a product info
example request body :
	{
		"description": "product x",
		"name": "px",
		"pathToImg" : ["path1", "path2"];
		"price": 15,
		"stock": 30
	}

GET http://localhost:4000/api/products/:id --> id required, used to get details of a product

DELETE http://localhost:4000/api/products/:id --> id required, used to delete a product 


POST http://localhost:4000/api/orders/

{
	"orderDate": "15/07/20",
	"products": [
		{"id":"wVoNDEwhngLnwxesyKn9","quantity": 2 , "subtotal": 20 },
	 	{"id":"U40eyymyKT0F68DWI6Eo","quantity": 3, "subtotal": 50 }
	],
	"status": "in progress",
	"totalPrice": 70,
	"username": "juan"
}

GET http://localhost:4000/api/orders/all , need admin token

GET http://localhost:4000/api/orders/user/:username , need account token, get all the orders from an user

PUT http://localhost:4000/api/orders/:id , need admin token, to update an order status

GET http://localhost:4000/api/orders/:id/details, need account token ,  to verify the details of an order


POST http://localhost:4000/api/users , to create an user
{
	"displayName": "admin",
	"password": "admin1",
	"email": "admin@hotmail.com",
	"role": "admin"
}


