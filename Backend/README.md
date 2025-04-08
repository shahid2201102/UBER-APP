# User Registration API

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their details. Upon successful registration, a JSON Web Token (JWT) is generated for the user.

## Request Body
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum 3 characters).
  - `lastname`: A string representing the user's last name (optional).
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

### Example Request
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Responses

### Success Response
- **Code**: 201 Created
- **Content**:
{
  "token": "JWT_TOKEN",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
  
### Error Responses
- **Code**: 400 Bad Request
- **Content**:
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
  
## Notes
- Ensure that the request body adheres to the specified format to avoid validation errors.
- The JWT token can be used for authenticating subsequent requests.

## User Login API
## Endpoint
POST /users/login

## Description
This endpoint allows an existing user to log in by providing their email and password. Upon successful authentication, a JSON Web Token (JWT) is returned.

## Request Body
The request body must be in JSON format and include the following fields:

- email: A string representing the user's email address (must be a valid email format).
- password: A string representing the user's password.

## Example Request
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Responses
Success Response
- Code: 200 OK
- Content:
{
  "token": "JWT_TOKEN",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}

Error Responses
- Code: 400 Bad Request
- Content:
{
  "errors": [
    {
      "msg": "Invalid Email or Password",
      "param": "email",
      "location": "body"
    }
  ]
}

 - Code: 401 Unauthorized
 - Content:
 {
  "error": "Authentication failed"
}

## Notes
- Ensure that the email and password provided are correct.
- The JWT token can be used for authenticating subsequent requests.