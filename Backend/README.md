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



# User Profile API

## Endpoint
`GET /users/profile`

## Description
This endpoint retrieves the profile information of the authenticated user. Requires a valid JWT token.

## Headers
- `Authorization`: Bearer {JWT_TOKEN}

## Responses

### Success Response
- **Code**: 200 OK
- **Content**:
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response
- **Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Unauthorized"
}
```

## Notes
- The JWT token must be included in the Authorization header.
- Token must be prefixed with "Bearer ".

---

# User Logout API

## Endpoint
`POST /users/logout`

## Description
This endpoint logs out the user by invalidating their JWT token.

## Headers
- `Authorization`: Bearer {JWT_TOKEN}

## Responses

### Success Response
- **Code**: 200 OK
- **Content**:
```json
{
  "message": "Logged out successfully"
}
```

### Error Response
- **Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Unauthorized"
}
```

## Notes
- The JWT token must be included in the Authorization header.
- After logout, the token will be blacklisted and can't be used again.




# Captain Registration API

## Endpoint
`POST /captain/register`

## Description
This endpoint allows a new captain to register by providing their personal details and vehicle information. Upon successful registration, the captain account is created.

## Request Body
The request body must be in JSON format and include the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the captain's first name (minimum 3 characters)
  - `lastname`: A string representing the captain's last name (optional)
- `email`: A string representing the captain's email address (must be a valid email format)
- `password`: A string representing the captain's password (minimum 6 characters)
- `vehicle`: An object containing:
  - `color`: A string representing the vehicle's color (minimum 3 characters)
  - `plate`: A string representing the vehicle's license plate number (minimum 3 characters)
  - `capacity`: An integer representing the vehicle's passenger capacity (minimum 1)
  - `vehicleType`: A string that must be one of: 'car', 'motorcycle', 'auto'

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.captain@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Responses

### Success Response
- **Code**: 201 Created
- **Content**:
```json
{
  "message": "Captain registered successfully",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses
- **Code**: 400 Bad Request
- **Content**:
```json
{
  "errors": [
    {
      "msg": "Firstname must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Vehicle type must be either car, motorcycle or auto",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

## Notes
- All fields except `lastname` are required
- Vehicle type must be one of the specified options: 'car', 'motorcycle', 'auto'
- Vehicle capacity must be a positive integer
- The email address must be unique in the system


# Captain Login API

## Endpoint
`POST /captain/login`

## Description
This endpoint allows a registered captain to log in using their email and password. Upon successful authentication, a JSON Web Token (JWT) is returned.

## Request Body
The request body must be in JSON format and include the following fields:

- `email`: A string representing the captain's email address (must be a valid email format)
- `password`: A string representing the captain's password (minimum 6 characters)

### Example Request
```json
{
  "email": "john.captain@example.com",
  "password": "securepassword"
}
```

## Responses

### Success Response
- **Code**: 200 OK
- **Content**:
```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Responses
- **Code**: 400 Bad Request
- **Content**:
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Invalid email or password"
}
```

---

# Captain Profile API

## Endpoint
`GET /captain/profile`

## Description
This endpoint retrieves the profile information of the authenticated captain. Requires a valid JWT token.

## Headers
- `Authorization`: Bearer {JWT_TOKEN}

## Responses

### Success Response
- **Code**: 200 OK
- **Content**:
```json
{
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

### Error Response
- **Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Unauthorized"
}
```

---

# Captain Logout API

## Endpoint
`GET /captain/logout`

## Description
This endpoint logs out the captain by invalidating their JWT token.

## Headers
- `Authorization`: Bearer {JWT_TOKEN}

## Responses

### Success Response
- **Code**: 201 Created
- **Content**:
```json
{
  "message": "Logout successfully"
}
```

### Error Response
- **Code**: 401 Unauthorized
- **Content**:
```json
{
  "message": "Unauthorized"
}
```

## Notes
- The JWT token must be included in the Authorization header
- After logout, the token will be blacklisted and can't be used again