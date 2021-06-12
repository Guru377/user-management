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

"User Registrasion"

Example: 

curl -X POST \
  http://localhost:3000/api/user/register \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: b6567c36-1535-41f1-8d4b-61349ec9b7a8' \
  -H 'cache-control: no-cache' \
  -d '{
	"name": "Guru Prasad",
	"email": "guruprasad@gmail.com",
	"contact": "9165659111",
	"address": "Ramnagar, Hyd, Telangana, 500020",
	"password": "123456789",
	"gender": "Male",
	"country": "India"
}'


### Response
{
    "user": "Guru Prasad",
    "message": "user rigiseterd"
}

### Request

"User Login"


Example:

curl -X POST \
  http://localhost:3000/api/user/login \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 31d110f0-ba92-4939-9449-faf2b3dc2b55' \
  -H 'cache-control: no-cache' \
  -d '{
	"email": "guruprasad@gmail.com",
	"password": "123456789"
	
}'

### Response

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0OTdmMjg4NTYxZTE3NDgwN2M0MTkiLCJpYXQiOjE2MjM0OTk4MDIsImV4cCI6MTYyMzUwMzQwMn0.d94jokk1jcR8ZsupxofESyo1744v55_kxUh9Rk6gtj8",
    "message": "user logged in!"
}

### Request

"Get User"

Example:

curl -X POST \
  http://localhost:3000/api/searchuser \
  -H 'Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0YjUyMTQwYWU2NzJiMDczMzg2ZGMiLCJpYXQiOjE2MjM1MDUwMDEsImV4cCI6MTYyMzUwODYwMX0.cgje1-lqip4mgJeDAFfflpOVXwS-PGfY1paq3vk2s4o' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: a81a8be7-cd0f-4b5c-8dfa-28bb21044528' \
  -H 'cache-control: no-cache' \
  -d '{
		"name": "Guru",
		"contact": "9165659111"
}'


### Response
{
    "users": [
        {
            "_id": "60c4aa091168ca21e154cc95",
            "name": "Guru Prasad",
            "email": "guruprasad@gmail.com",
            "password": "$2b$10$S9mrcoVQGtIyT1Rwcc7C6OQl9u.a7Zs1tuQH.wl9eXR3YL3.qGIWa",
            "address": "Ramnagar, Hyd, Telangana, 500020",
            "contact": "9165659111",
            "gender": "Male",
            "country": "India",
            "date": "2021-06-12T12:35:21.401Z",
            "__v": 0
        }
    ]
}


### Request

"User Logout"

Example:

curl -X DELETE \
  http://localhost:3000/api/user/logout \
  -H 'Authorization: [{"key":"Authorization","value":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM0YjUyMTQwYWU2NzJiMDczMzg2ZGMiLCJpYXQiOjE2MjM1MDUwMDEsImV4cCI6MTYyMzUwODYwMX0.cgje1-lqip4mgJeDAFfflpOVXwS-PGfY1paq3vk2s4o","description":"","type":"text","enabled":true}]' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 7bee7a39-7798-490b-b0dd-1aefddd020f3' \
  -H 'cache-control: no-cache'

  
  ### Response

  {
    "message": "logged off!"
}


