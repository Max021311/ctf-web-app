# How to run (Development)

## Requirements

- This web app depends on two backen servers
  - [CRUD microservice](https://github.com/Max021311/ctf-crud-microservice). Setup this repo first with the following env vars
    ```bash
    PORT=3011
    PREFIX=/api/crud
    ```
  - [Auth microservice](https://github.com/Max021311/ctf-auth-microservice) Setup this repo after the CRUD microservice with the following env vars
    ```bash
    PORT=3010
    PREFIX=/api/auth
    ```

## Steps

1. Setup environment vars

It's required to create a `.env` file in project root with the following vars where `PORT` is the port for running the web app and `VITE_SERVER_HOST` is URL to the server
```bash
VITE_AUTH_SERVER_HOST=http://localhost:3010/api/auth # Replace with the correct host
VITE_CRUD_SERVER_HOST=http://localhost:3010/api/crud # Replace with the correct host
PORT=3000
```

2. Install dependencies with `yarn install`

3. Run the web app with `yarn dev`
