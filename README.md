# PasarNow-Technical-Assessment API Documentation

## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`
- `GET /user`

Authentication required:

- `POST /food`
- `GET /food`
- `GET /food?page=3`
- `GET /food/:mongoId`
- `GET /food/category/:category`
- `GET /food/groupBy`
- `PUT /food/:mongoId`
- `DELETE /food/:mongoId`

&nbsp;

How to run locally:

1. run node migrations/create-users-collection-with-validation.js
2. run node seeders/seedingUsers.js
3. run node seeders/seedingFood.js
4. run nodemon app / node app

&nbsp;

## 1. POST /user/register

Request:

- body:

```json
{
  "username": "admin3",
  "email": "admin3@admin.com",
  "password": "admin3",
  "phoneNumber": "08333333333",
  "address": "Jalan Jalan ke Pasarbaru 3"
}
```

_Response (201 - Created)_

```json
{
  "message": "Register Successful! with ObjectId(6274e749764553ed86fb8056)"
}
```

Request:

- body:

```json
{
  "username": "admin3",
  "email": "",
  "password": "",
  "phoneNumber": "08333333333",
  "address": "Jalan Jalan ke Pasarbaru 3"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email or Password required"
}
```

OR

```json
{
  "message": "Validation Error"
}
```

OR

```json
{
  "message": "Email already exists"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 2. POST /user/login

Request:

- body:

```json
{
  "email": "admin1@admin.com",
  "password": "admin1"
}
```

_Response (200 - OK)_

```json
{
  "message": "Login Successful!",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4Mjg4NjQsImV4cCI6MTY1MTgzMjQ2NH0.rAjAytZKlgnmz4XDGD89SSNXwXyM9-XuYKTtJeoUQgo"
}
```

access_token expires in 1 hour

_Response (401 - Unauthorized)_

```json
{
  "message": "Email or Password invalid."
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 3. GET /user/

Description:

- Get all User from database

_Response (200 - OK)_

```json
{
  "message": "Fetched users data success!",
  "data": [
    {
      "_id": "62722e31657583449539d729",
      "username": "admin1",
      "email": "admin1@admin.com",
      "role": "admin",
      "phoneNumber": "608-471-1018",
      "address": "14 Paget Trail"
    },
    {
      "_id": "62722e31657583449539d72a",
      "username": "customer1",
      "email": "customer1@customer.com",
      "role": "customer",
      "phoneNumber": "229-217-0674",
      "address": "27 Mallard Street"
    },
    ...
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 4. POST /food/

Description:

- Post Food to database

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- body:

```json
{
  "name": "Salmon Supreme",
  "description": "サーモンスプリーム",
  "price": 32000,
  "imgUrl": "https://genkisushi.co.id/media/2020/06/salmon-supreme-x.jpg",
  "category": "Nigiri"
}
```

_Response (201 - Created)_

```json
{
  "message": "Created food data success!",
  "insertedId": "6274ee924d788de9798d1feb"
}
```

Request:

- body:

```json
{
  "name": "",
  "description": "",
  "price": "",
  "imgUrl": "",
  "userId": "",
  "categoryId": ""
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Food already exists"
}
```

OR

```json
{
  "message": "Food name is required"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 5. GET /food

Description:

- Get all Food from database

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

_Response (200 - OK)_

```json
{
  "message": "Fetched food data success!",
  "data": [
    {
      "_id": "62739d2162fdc36aa82175a0",
      "name": "Baby Octopus",
      "description": "赤ちゃんタコ",
      "price": 40000,
      "imgUrl": "https://genkisushi.co.id/media/2020/06/baby-octopus-x.jpg",
      "userId": "62722e31657583449539d729",
      "category": "Appetizer"
    },
    {
      "_id": "62739d2262fdc36aa82175a1",
      "name": "Chuka Wakame",
      "description": "ちゅかわかめ",
      "price": 30000,
      "imgUrl": "https://genkisushi.co.id/media/2020/06/chuka-wakame-x.jpg",
      "userId": "62722e31657583449539d729",
      "category": "Appetizer"
    },
   ...
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 6. GET /food?page=3

Description:

- Get Food by Page

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- query:

```json
{
  "page": 3
}
```

page value will be default 1 if its empty string or undefined

_Response (200 - OK)_

```json
{
  "message": "Fetched food data by page success!",
  "data": [
    {
      "metadata": [
        {
          "total": 4
        }
      ],
      "food": [
        {
          "_id": "62739d2262fdc36aa82175b4",
          "name": "Hana Sushi",
          "description": "花寿司",
          "price": 45000,
          "imgUrl": "https://genkisushi.co.id/media/2020/06/hana-sushi-x.jpg",
          "category": "Nigiri"
        },
        {
          "_id": "62739d2262fdc36aa82175b5",
          "name": "Salmon Combo",
          "description": "サーモンコンボ",
          "price": 79000,
          "imgUrl": "https://genkisushi.co.id/media/2020/06/salmon-combo-x.jpg",
          "category": "Nigiri"
        },
        {
          "_id": "62739d2262fdc36aa82175b6",
          "name": "Dynamite Salmon Nigiri",
          "description": "ダイナマイトサーモンニギリ",
          "price": 28000,
          "imgUrl": "https://genkisushi.co.id/media/2020/06/dynamite-salmon-nigiri-x.jpg",
          "category": "Nigiri"
        },
        {
          "_id": "6274ee924d788de9798d1feb",
          "name": "Salmon Supreme",
          "description": "サーモンスプリーム",
          "price": 32000,
          "imgUrl": "https://genkisushi.co.id/media/2020/06/salmon-supreme-x.jpg",
          "category": "Nigiri"
        }
      ]
    }
  ]
}
```

Request:

- query:

```json
{
  "page": 100
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 7. GET /food/:mongoId

Description:

- Get Food by mongoId

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- params:

```json
{
  "mongoId": "62739d2262fdc36aa82175b4"
}
```

_Response (200 - OK)_

```json
{
  "message": "Fetched food data by ID success!",
  "data": {
    "_id": "62739d2262fdc36aa82175b4",
    "name": "Hana Sushi",
    "description": "花寿司",
    "price": 45000,
    "imgUrl": "https://genkisushi.co.id/media/2020/06/hana-sushi-x.jpg",
    "userId": "62722ebe1a9cd6cafe9d1858",
    "category": "Nigiri"
  }
}
```

Request:

- params:

```json
{
  "mongoId": "62739d2262fdc36aa82175c4"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 8. GET /food/category/:category

Description:

- Get Food by category

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- params:

```json
{
  "category": "Sashimi"
}
```

_Response (200 - OK)_

```json
{
  "message": "Fetched food data by category success!",
  "data": [
    {
      "name": "Salmon Sashimi",
      "price": 45000,
      "imgUrl": "https://genkisushi.co.id/media/2020/06/salmon-sashimi-x.jpg",
      "category": "Sashimi"
    },
    {
      "name": "Tuna Sashimi",
      "price": 40000,
      "imgUrl": "https://genkisushi.co.id/media/2020/06/tuna-sashimi-x.jpg",
      "category": "Sashimi"
    },
    ...
  ]
}
```

Request:

- params:

```json
{
  "category": "Sash"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 9. GET /food/groupBy

Description:

- Get Food Menu Insight Group by Category

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- query:

```json
{
  "by": "category
}
```

by value will be default 'category' if its empty string or undefined

_Response (200 - OK)_

```json
{
  "message": "Fetched food data group by category success!",
  "data": [
    {
      "_id": "Makimono",
      "totalMenu": 3,
      "averagePrice": 40000,
      "maxPrice": 45000,
      "minPrice": 35000
    },
    {
      "_id": "Appetizer",
      "totalMenu": 4,
      "averagePrice": 36000,
      "maxPrice": 48000,
      "minPrice": 26000
    },
    {
      "_id": "Nigiri",
      "totalMenu": 5,
      "averagePrice": 37360,
      "maxPrice": 79000,
      "minPrice": 2800
    },
    {
      "_id": "Sashimi",
      "totalMenu": 5,
      "averagePrice": 62600,
      "maxPrice": 90000,
      "minPrice": 40000
    },
    {
      "_id": "Gunkan",
      "totalMenu": 7,
      "averagePrice": 28571.428571428572,
      "maxPrice": 55000,
      "minPrice": 15000
    }
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 10. PUT /food/:mongoId

Description:

- Update Food by mongoId

Request:

- headers:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- params:

```json
{
  "mongoId": "6274ee924d788de9798d1feb"
}
```

- body:

```json
{
  "name": "Salmon Supreme",
  "description": "サーモンスプリーム",
  "price": 32000,
  "imgUrl": "https://genkisushi.co.id/media/2020/06/salmon-supreme-x.jpg",
  "category": "Nigiri"
}
```

_Response (200 - OK)_

```json
{
  "message": "Updated food data success!",
  "modifiedCount": 1
}
```

Request:

- body:

```json
{
  "name": "",
  "description": "",
  "price": "",
  "imgUrl": "",
  "userId": "",
  "categoryId": ""
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Food name is required"
}
```

OR

```json
{
  "message": "Food already exists"
}
```

Request:

- params:

```json
{
  "id": "6274ee924d788de9798d1fcb"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## 11. DELETE /food/:mongoId

Description:

- Delete Food by mongoId

Request:

- headers:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTE4MzAxMDQsImV4cCI6MTY1MTgzMzcwNH0.ztgCMiQrmEKDB2Z21_knscQFkYddn87175ZtxwA7-xg"
}
```

- params:

```json
{
  "mongoId": "6274ee924d788de9798d1feb"
}
```

_Response (200 - OK)_

```json
{
  "message": "Deleted food data success!",
  "deletedCount": 1
}
```

Request:

- params:

```json
{
  "mongoId": "6274ee924d788de9798d1fab"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Food not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid signature"
}
```

OR

```json
{
  "message": "jwt expired"
}
```

OR

```json
{
  "message": "jwt must be provided"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
