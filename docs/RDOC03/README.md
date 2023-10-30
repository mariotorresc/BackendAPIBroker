# 2023-2 / IIC2173 - E2 | Fintech Async | Serverless / SAM

## Implementación: Paso a paso

Para subir la aplicacióna a Serverless, es necesario instalar Serverless primero con el siguiente comando:

```
sls create -n ayudantia-serverless -t aws-python3
```

Luego se hace deploy de la aplicación:

```
sls deploy --stage demo.
```



Tambien se creo un entorno virtual de python para poder subirlo como layer de la función lambda para generar el PDF del siguiente manera:

1- 

```
python3 -m venv test_venv
```

2-

### [En Ubuntu]
```
source test_venv/bin/activate
```


### [En Windows]
```
.\test_venv\Scripts\activate
```


3-
```
mkdir python
```


4-

```
pip install requests boto3 reportlabs -t python
```

5-

### [En Ubuntu]
```
zip -r requests.zip python
```

### [En Windows]
```
powershell Compress-Archive python requests.zip
```

6- 

En AWS, vaya a la sección de capas.
Agregue una nueva capa y elija "Capa Personalizada".
Seleccione y suba el archivo zip creado en el paso anterior.

7- En la configuración de nuestra función serverless, elija la capa personalizada recién creada.


A la función se le tuvieron que atribuir distintos permisos dentro de IAM, lo mismo en el caso del bucket de S3 con nombre boletas-arqui
