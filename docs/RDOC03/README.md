# 2023-2 / IIC2173 - E1 | Fintech Async | Deploy local para testing

## Frontend

El frontend se encuentra en el siguiente repositorio: https://github.com/sofilatham/Frontend-G3-Arqui. Luego de clonar el repositorio localmente, se ejecutan los comandos:
```
yarn
yarn dev
```

Para instalar las dependencias y correr aplicación, respectivamente. Además, es necesario tener una versión de node igual o mayor a v16.

## Backend

Para correr localmente el backend se necesita clonar el repositorio e instalar docker y docker compose. Luego, desde la carpeta *root* del repositorio ejecutar los comandos:
```
docker compose build
docker compose up
```
El primer comando creará las imagenes y el segundo comando levantará los contenedores. Para iniciar docker se corre el comando `sudo service docker start` en caso que no esté iniciado. Si los comandos fallan probar con `docker-compose` en lugar de `docker compose`, es decir, reemplazar el espacio por un guión. 