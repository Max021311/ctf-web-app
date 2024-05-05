# ¿Cómo ejecutar el proyecto? (Desarrollo)

## Requisitos

- Depende de dos microservicios
  - [CRUD microservice](https://github.com/Max021311/ctf-crud-microservice). Es necesario configurar primero este repositorio y configurar estas variables de entorno en el repositorio
    ```bash
    PORT=3011
    PREFIX=/api/crud
    ```
  - [Auth microservice](https://github.com/Max021311/ctf-auth-microservice). Este es el segundo repositorio a configurar y deben configurars las siguientes variables de entorno.
    ```bash
    PORT=3010
    PREFIX=/api/auth
    ```

## Pasos

1. Configurar variables de entorno

Es necesario crear un archivo `.env` en la raiz del proyecto con las variables `PORT` que es el puerto donde se ejecutara la app web, `VITE_AUTH_SERVER_HOST` que es la URL al servidor de autenticación y `VITE_CRUD_SERVER_HOST` que es la URL al servidor CRUD.
```bash
VITE_AUTH_SERVER_HOST=http://localhost:3010/api/auth # Replace with the correct host
VITE_CRUD_SERVER_HOST=http://localhost:3010/api/crud # Replace with the correct host
PORT=3000
```

2. Instalamos las dependencias con `yarn install`

3. Ejecutar la app con `yarn dev`
