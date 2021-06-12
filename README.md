# user-registration

## Install 
npm install

## Save connection string in .env file
DB_CONNECT = ""

## Save token secret code in .env file
TOKEN_SECRET = 

## Start project
node app.js


# REST API

### Request

`/api/user/register`

Example: 

curl -X POST \
  http://localhost:3000/api/user/register \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: da70affd-04fa-4d0c-b8d0-7922275182f8' \
  -H 'cache-control: no-cache' \
  -d '{
	"name": "Pranav",
	"email": "pranv1@gmail.com",
	"contact": "9165659111",
	"address": "Ramnagar, Hyd, Telangana, 500020",
	"password": "123456789",
	"gender": "Male",
	"country": "India"
}'



### Response