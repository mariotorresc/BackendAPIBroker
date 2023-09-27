# 2023-2 / IIC2173 - E1 | Fintech Async | Deploy local para testing

## Frontend
El frontend se encuentra en el siguiente repositorio: https://github.com/sofilatham/Frontend-G3-Arqui. Luego de clonar el repositorio localmente, se ejecutan los comandos:

```
yarn install
yarn dev
```
En el .env deben ir las siguientes lineas de codigo:

VITE_BACKEND_URL="https://l25f2hn25d.execute-api.us-east-2.amazonaws.com/Production" para la API GATEAWAY

Para crear un usuario con autorizaciónes validas es necesario confirmar a este desde AWS Cognito, para esto se tiene que ingresar a la cuenta con email:(Lo entregamos en la demo o por mail) y contraseña: (Lo entregamos en la demo o por  mail), luego de haber ingresado a AWS se tiene que ir a el servicio Cognito, dentro de ests escoger la user pool "Arqui-pool2", en la sección de de Users vera su solicitud de confirmación, para confimar su solicitud se tiene que hacer click sobre el link bajo la columna username perteneciente a usted. Una vez realizado todo esto solo queda hacer click en el boton "Actions" que  se encuentra en la esquina superior derecha de la pagina y luego en el dropdown escoger la opción "Confirm Account" y aceptar su validación.

Para instalar las dependencias y correr aplicación, respectivamente. Además, es necesario tener una versión de node igual o mayor a v16.

## Backend
Para correr el backend se debe instalar:

```
postgresql
Docker (docker-compose)
```

Para que funcione se necesita crear un `.env` siguiendo el `.env.template`. Rellenando las variables de entorno faltantes.

Para correr localmente el backend se necesita clonar el repositorio e instalar docker y docker compose. Luego, desde la carpeta *root* del repositorio ejecutar los comandos:
```
docker compose build
docker compose up
```
El primer comando creará las imagenes y el segundo comando levantará los contenedores. Para iniciar docker se corre el comando `sudo service docker start` en caso que no esté iniciado. Si los comandos fallan probar con `docker-compose` en lugar de `docker compose`, es decir, reemplazar el espacio por un guión. 