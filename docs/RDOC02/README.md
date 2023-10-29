# 2023-2 / IIC2173 - E1 | Fintech Async | Webpay integration

## Frontend

Para implementar el Webpay en el frontend se siguio el diagrama entregado en el enunciado. Para esto primero en la vista de /stockHistory se cambio el handler del boton de compra para que reciba la url a la cual redireccionar el pago. Luego se abre una pestaña para realizar el flujo del pago. Una vez realizado el flujo (sea cual sea sea el resultado) se lleva a una vista de la pagina /purchaseCompleted la que con un boton devuelve la informacion del final de la transaccion al backend a traves de la API Gateway.

## Backend

Por el lado del backend, en el endpoint ya existente /stocks/purchase se cambio para mandar una solicitud de pago a webpay, la cual responde con un deposit_token. Este es almacenado en la BD dentro del modelo previamente creado. Una vez actualizado la request con su depositToken, se manda un mensaje a traves de stocks/request con la intencion de compra.

Una vez finalizado el flujo de compra en el frontend, se envia al endpoint /sotcks/transaction-details el token_ws que respondio la pagina de webpay. Con esta se sigue un flujo con 3 posibles casos:

1. El comprador anulo la compra, para este se setea las variables de la request como:
```
    state: false,
    validated: true,
```
para despues publicar la validacion a traves de canal de validaciones y finalmente responder al frontend con un mensaje: Transaccion anulada por el usuario

2. El caso en que se rechaze la compra, para este se setean las variables como:
```
    state: false,
    validated: true,
```
para despues publicar la validacion a traves de camal de validaciones y finalmente responder al frontend con un mensaje: Transaccion ha sido rechazada

3. El caso en que se acepte la compra, en este se setean las variables como 
```
    state: true,
    validated: true,
```
para despues publicar la validacion a traves de camal de validaciones y finalmente responder al frontend con un mensaje: Transaccion ha sido aceptada