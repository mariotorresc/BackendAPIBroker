# 2023-2 / IIC2173 - E1 | Fintech Async | Pipeline CI

## Frontend

En el caso del Frontend, solo se corre el lint en GitHub actions, ya que este no posee. Modelos, por lo que hacer tests no tiene sentido para esta entrega.

## Backend

Para  el pipe CI decidimos utilizar GitHub Actions, debido a que es muy popular y generalmente un estándar, por lo que familiarizarse con este es una necesidad para un programador. 
En el caso del Backend se corre un archivo de `main.yml`, el cual primero hace el build, luego las migraciones para finalmente probar tests y lintern. En esta entrega no existen tests unitarios más que el assert true que viene por default en el `.yml`. En el caso de lintern se usó ESLint con una configuración avanzada sacada de un template.
Al mismo tiempo y para facilitar el paso de los linterns se implementó prettier, el cual ayuda a corregir código.
