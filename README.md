<div align="center">

# Amredi-Backend

<p> The backend api for the Amredi mobile application </p>
</div>

## Getting started

1. clone the respository
   ```shell
   $ git clone https://github.com/Binary-Brigades/Amredi-Backend.git
   $ cd Amredi-Backend
   $ touch .env
   ```
2. Add the following variables to the .env file
   ```
   PORT = [port your that your will run on]
   mongoDbUrl = [mongodburl]
   mongoDbName = [name of the database]
   gmailUser = [ your email adress]
   gmailPass = [ your gmail password]
   AccessTokenSecretKey = [random string ]
   AccessTokenExpires = [the time before which the access token should expire eg 1h or 1d or 7d]
   ```

## Registration

> **request**

- url: amredi-backend.vercel.app/api/v1/auth/register
- method: POST
- example of a request body:
  ```json
  {
    "first_name": "Antony",
    "last_name": "Kariuki",
    "email": "antonygichoya1@gmail.com",
    "password": "password",
    "phone_number": "+25474359612",
    "location": {
      "type": "Point",
      "coordinates": [-74.006, 40.7128]
    },
    "confirm_password": "password"
  }
  ```
  > **response**

* status code: `201` if success else `400`
* response body:

```json
   "status": "success",
   "message": "user registerd successfully",
```

## Account verification

> **request**

- url: amredi-backend.vercel.app/api/v1/auth/verify-account
- method: POST
- request body:
  ```
  code: string
  ```
  > **response**

* status code: `202` if success else `401`
* response body:

```json
   "status": "success. account verified successfully",
```

## Login

> **request**

- url: amredi-backend.vercel.app/api/v1/auth/login
- method: POST
- request body:
  ```json
  "email": "string"
  "password": "string"
  ```
  > **response**
- status code: `200` if success else `401`
- response body:

```json
   "status": "success",
   "access_token": "<user access token >",
```

## Get Profile

> **request**

- url: amredi-backend.vercel.app/api/v1/user/profile
- method: GET

> **response**

- status code: `200`
- example of a response body:

```json
   "first_name": "maich",
   "last_name": "magode",
   "email": "mainamaich@gmail.com",
```

## Edit Profile

> **request**

- url: amredi-backend.vercel.app/api/v1/user/edit-profile
- method: POST

* request body:
  ```
  first_name: string optional
  last_name: string optional
  email: string optional
  phone_number: string optional -> should start with country code
  password: string optional
  confirm_password: ref(password)
  ```

> **response**

- status code: `200`
- response body:

```json
   "first_name": "maich",
   "last_name": "magode",
   "email": "mainamaich@gmail.com",
```

## Connect

> **request**

- url: amredi-backend.vercel.app/api/v1/user/connect
- method: GET
- headers:

  ```yaml
  Content-Type: application/json
  Authorization: Bearer <token>
  ```

> **response**

- status code: `200`
- response body:

```json
[
  {
    "first_name": "Antony",
    "last_name": "Kariuki",
    "location": "Nairobi, Kenya"
  },
  {
    "first_name": "Antony",
    "last_name": "Kariuki",
    "location": "Nairobi, Kenya"
  }
]
```

## Create Post

> **request**

- url: amredi-backend.vercel.app/api/v1/post/create
- method: POST

* request headers:

  ```
   Accept: "application/json",
   authorization: `Bearer token`,

  ```

* request body:

  ```
  " title": string  required
  "description": string  required
  "image": file

  ```

> **response**

- status code: `201`
- response body:

```json
message: "Post created successfully",

   title,
   description,
   image: {
        publicId: result.public_id,
        url: result.secure_url, -> live link from cloudinary
      },
   createdBy: user._id,
```

## Get Posts

### get all posts

> **request**

- url: amredi-backend.vercel.app/api/v1/post/getall
- method: GET

* request headers:

  ```
   Accept: "application/json",
   authorization: `Bearer token`,

  ```

> **response**

- status code: `200`
- response body:

```json
[
  {
    "image": {
      "publicId": "amredi/hg1znknlzy0jexgpiwvt",
      "url": "https://res.cloudinary.com/dlio7cpjo/image/upload/v1707832312/amredi/hg1znknlzy0jexgpiwvt.jpg"
    },
    "_id": "65cb73f93a4fa55962650101",
    "title": "hello",
    "description": "helloo",
    "createdBy": "65c9ef8c05e3670930dc9408",
    "likes": [],
    "time": "2024-02-13T13:51:53.358Z",
    "__v": 0
  },
  {
    "image": {
      "publicId": "amredi/yh1j84aexj70ofqwnf7e",
      "url": "https://res.cloudinary.com/dlio7cpjo/image/upload/v1707832530/amredi/yh1j84aexj70ofqwnf7e.jpg"
    },
    "_id": "65cb74d2e667544b9bffb02c",
    "title": "helllo",
    "description": "helloo",
    "createdBy": "65c9ef8c05e3670930dc9408",
    "likes": [],
    "time": "2024-02-13T13:55:30.637Z",
    "__v": 0
  }
]
```

### get post by id

## Get All Likes From A Post

> **request**

- url: amredi-backend.vercel.app/api/v1/post/:postId/getpost
- method: GET

* request params:

  ```
  postId

  ```

> **response**

- status code: `200`
- response body:

```json
{
  "image": {
    "publicId": "amredi/yh1j84aexj70ofqwnf7e",
    "url": "https://res.cloudinary.com/dlio7cpjo/image/upload/v1707832530/amredi/yh1j84aexj70ofqwnf7e.jpg"
  },
  "_id": "65cb74d2e667544b9bffb02c",
  "title": "helllo",
  "description": "helloo",
  "createdBy": "65c9ef8c05e3670930dc9408",
  "likes": [],
  "time": "2024-02-13T13:55:30.637Z",
  "__v": 0
}
```

### get posts of a given user

> **request**

- url: amredi-backend.vercel.app/api/v1/post/:postId/getpost
- method: GET

* request headers:

  ```
   Accept: "application/json",
   authorization: `Bearer token`,

  ```

> **response**

- status code: `200`
- response body:

```json
[
  {
    "image": {
      "publicId": "amredi/hg1znknlzy0jexgpiwvt",
      "url": "https://res.cloudinary.com/dlio7cpjo/image/upload/v1707832312/amredi/hg1znknlzy0jexgpiwvt.jpg"
    },
    "_id": "65cb73f93a4fa55962650101",
    "title": "hello",
    "description": "helloo",
    "createdBy": "65c9ef8c05e3670930dc9408",
    "likes": ["65c9ef8c05e3670930dc9408"],
    "time": "2024-02-13T13:51:53.358Z",
    "__v": 2
  },
  {
    "image": {
      "publicId": "amredi/yh1j84aexj70ofqwnf7e",
      "url": "https://res.cloudinary.com/dlio7cpjo/image/upload/v1707832530/amredi/yh1j84aexj70ofqwnf7e.jpg"
    },
    "_id": "65cb74d2e667544b9bffb02c",
    "title": "helllo",
    "description": "helloo",
    "createdBy": "65c9ef8c05e3670930dc9408",
    "likes": [],
    "time": "2024-02-13T13:55:30.637Z",
    "__v": 0
  }
]
```

## Like a Post

> **request**

- url: amredi-backend.vercel.app/api/v1/post/:postId/like
- method: POST

* request headers:

```

Accept: "application/json",
authorization: `Bearer token`,

```

> **response**

- status code: `201`
- response body:

```json
{
  "message": "Post liked successfully",
  "numberOfLikes": 1
}
```

## Group

### Create a Groups

> **request**

- url: amredi-backend.vercel.app/api/v1/group/create
- method: POST

* request headers:

```

Accept: "application/json",
authorization: `Bearer token`,

```

- request body:

```

{
  "name": "Tuniuane"
}

```

> **response**

- status code: `201`
- response body:

```json
{
  "success": true,
  "data": {
    "name": "Tunaweza",
    "createdBy": "65c9ef8c05e3670930dc9408",
    "_id": "65cf9be5a6da515118b61d80",
    "time": "2024-02-16T17:31:17.500Z",
    "members": [
      {
        "userId": "65c9ef8c05e3670930dc9408",
        "role": "admin",
        "_id": "65cf9be5a6da515118b61d82"
      }
    ],
    "__v": 1
  }
}
```

### Gete all Group

> **request**

- url: amredi-backend.vercel.app/api/v1/group/getall
- method: GET

* request headers:

```

Accept: "application/json",
authorization: `Bearer token`,

```

> **response**

- status code: `200`
- response body:

```json
{
  "success": true,
  "data": [
    {
      "_id": "65cf9b9ca6da515118b61d79",
      "name": "Tuinuane",
      "createdBy": "65c9ef8c05e3670930dc9408",
      "time": "2024-02-16T17:30:04.195Z",
      "members": [
        {
          "userId": "65c9ef8c05e3670930dc9408",
          "role": "admin",
          "_id": "65cf9b9ca6da515118b61d7b"
        }
      ],
      "__v": 1
    },
    {
      "_id": "65cf9be5a6da515118b61d80",
      "name": "Tunaweza",
      "createdBy": "65c9ef8c05e3670930dc9408",
      "time": "2024-02-16T17:31:17.500Z",
      "members": [
        {
          "userId": "65c9ef8c05e3670930dc9408",
          "role": "admin",
          "_id": "65cf9be5a6da515118b61d82"
        }
      ],
      "__v": 1
    }
  ]
}
```
