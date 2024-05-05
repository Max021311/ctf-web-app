# How to run (Development)

## Requirements

- This web app depends on the backend server. You need to run the backend first.

## Steps

1. Setup environment vars

It's required to create a `.env` file in project root with the following vars where `PORT` is the port for running the web app and `VITE_SERVER_HOST` is URL to the server
```bash
VITE_AUTH_SERVER_HOST=http://localhost/api/auth # Replace with the correct host
VITE_CRUD_SERVER_HOST=http://localhost/api/crud # Replace with the correct host
PORT=3000
```

2. Install dependencies with `yarn install`

3. Run the web app with `yarn dev`
