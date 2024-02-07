<div align="center">

# Amredi-Backend
<p> The backend api for the Amredi mobile application </p>
</div>

## Registration
**request**
* url:   /api/v1/auth/register
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
**response**
- status code: `201` if success else `400`
- response body: 
   ```json
      status: "success",
      message: "user registerd successfully",
   ```
## Account verification
**request**
* url:   /api/v1/auth/verify-account
* method: POST
* request body:
   ```
   code: string
   ```
**response**
- status code: `202` if success else `401`
- response body: 
   ```json
      status: "success. account verified successfully",
   ```

