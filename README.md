<div align="center">

# Amredi-Backend
<p> The backend api for the Amredi mobile application </p>
</div>

## Registration
>**request**
* url: amredi-backend.vercel.app/api/v1/auth/register
* method: POST
* request body:
   ```
   first_name: string
   last_name: string
   email: string
   phone_number: string -> should start with country code 
   password: string
   confirm_password: ref(password)
   ```
>**response**
- status code: `201` if success else `400`
- response body: 
```json
   "status": "success",
   "message": "user registerd successfully",
```
## Account verification
>**request**
* url:   amredi-backend.vercel.app/api/v1/auth/verify-account
* method: POST
* request body:
   ```
   code: string
   ```
>**response**
- status code: `202` if success else `401`
- response body: 
```json
   "status": "success. account verified successfully",
```
##  Login
> **request**
- url: amredi-backend.vercel.app/api/v1/auth/login
- method: POST
- request body:
   ```json
   email: string
   password: string
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
- response body: 
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