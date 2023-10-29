# celery
from celery import shared_task
# from celery_config.controllers import sum_to_n

# standard
import time

# Mio
import datetime
# from pprint import pprint
from sklearn.linear_model import LinearRegression
import numpy as np
# %matplotlib inline
# from matplotlib import pyplot as plt


# The "shared_task" decorator allows creation
# of Celery tasks for reusable apps as it doesn't
# need the instance of the Celery app.
# @celery_app.task()
# @shared_task()
# def add(x, y):
#     return x + y

@shared_task
def calcular_indice(details):
    print('empezando a calcular indice en el worker')

    N = details["N"]
quantity = details["quantity"]
pond = 1 + [(5 + N - 50) / 50]
time = details["time"]
actual_date = details["actual_date"]


fechas = []
precios = []
for XX in details["historial"]:
    fechas.append(XX["date"])
    precios.append(XX["price"])
print(f"fechas: {fechas}")
print(f"precios: {precios}")



np_fechas_num = np.array(fechas_num).reshape(-1, 1)
np_precios = np.array(precios).reshape(-1, 1)

# Hacer prediccion:
tiempo_para_prediccion = date_limite_adelante - date_limite_atras
tiempo_para_prediccion_segundos = tiempo_para_prediccion.total_seconds()

print("tiempo para prediccion", tiempo_para_prediccion)
print("tiempo para prediccion en segundos", tiempo_para_prediccion_segundos)

# print('maximo:', maximo)
# print('ahora:', ahora)

# tiempo_prediccion_segundos = maximo + (dias_atras * 86400) # 86400 segundos en un dia
modelo = LinearRegression()
modelo.fit(np_fechas_num, np_precios)

# Obtener los coeficientes de la regresión
pendiente = modelo.coef_
intercepto = modelo.intercept_
# print('pendiente:', pendiente)
# print('intercepto:', intercepto)
# print("prediccion:", pendiente*tiempo_para_prediccion_segundos + intercepto)

prediccion = modelo.predict([[tiempo_para_prediccion_segundos]])
# prediccion = modelo.predict(np_fechas_num)
Y = prediccion[0][0]
print(f"Precio predicho para el día {dias_atras} en el futuro: {Y}")


prediccion = Y * pond

final = {
    "quantity": quantity,
    "symbol": symbol,
    "time": time,
    "N": N,
    "Y": Y,
    "pond": pond,
    "prediction": prediccion,
    "actual_date": actual_date,

}

# quiza pasar a JSON y enviarlo devuelta al backend.


    # time.sleep(20)

    # dias_atras = details["time"]
    # cantidad = details["quantity"]
    # date_ahora = datetime.datetime.now()
    # tiempo_atras = datetime.timedelta(days=dias_atras)
    # date_limite_atras = datetime.datetime.now() - tiempo_atras
    # date_limite_adelante = datetime.datetime.now() + tiempo_atras
    # print('date de ahora:', date_ahora)
    # print('date limite atras:', date_limite_atras)
    # print('date limite adelante:', date_limite_adelante)
    # print('tiempo_limite', tiempo_atras)
    # historial = []
    # fechas = []
    # precios = []
    # for stock in details["stocksHistories"]:
    #     fecha_creacion_stock = stock["createdAt"][:-1] # elimina la Z
    #     # print("fecha creacion", fecha_creacion_stock, type(fecha_creacion_stock))
    #     fecha_creacion_datetime = datetime.datetime.fromisoformat(fecha_creacion_stock)
    #     # print(type(fecha_creacion_datetime))
    #     if fecha_creacion_datetime >= date_limite_atras:
    #         historial.append(stock)
    #         fechas.append(fecha_creacion_datetime)
    #         precios.append(float(stock["price"]))
    #     else:
    #         print(f'esta stock, con dia {fecha} no entra a mi registro')
    # # pprint(historial) # lista de diccionarios con cada stock que me importa
    # print("fechas:", fechas)
    # print("precios:", precios)

    # fechas_num = []
    # # fechas_num_cero = []
    # for fecha in fechas:
    #     fechas_num.append((fecha - date_limite_atras).total_seconds()) # esto ne da objeto de tipo <built-in method total_seconds of datetime.timedelta object at 0x7f3abe852b50>
    # print("fechas_num:", fechas_num) # aca ya tengo las fechas en numeros

    # # minimo = min(fechas_num)
    # # for segundos in fechas_num:
    # #     fechas_num_cero.append(segundos - minimo)
    # # print('fechas_num_cero:', fechas_num_cero)
    # # np_fechas_num_cero = np.array(fechas_num_cero).reshape(-1, 1)
    # # np_precios = np.array(precios).reshape(-1, 1)

    # np_fechas_num = np.array(fechas_num).reshape(-1, 1)
    # np_precios = np.array(precios).reshape(-1, 1)

    # # Hacer prediccion:
    # tiempo_para_prediccion = date_limite_adelante - date_limite_atras
    # tiempo_para_prediccion_segundos = tiempo_para_prediccion.total_seconds()

    # print("tiempo para prediccion", tiempo_para_prediccion)
    # print("tiempo para prediccion en segundos", tiempo_para_prediccion_segundos)

    # # print('maximo:', maximo)
    # # print('ahora:', ahora)

    # # tiempo_prediccion_segundos = maximo + (dias_atras * 86400) # 86400 segundos en un dia
    # modelo = LinearRegression()
    # modelo.fit(np_fechas_num, np_precios)
    # prediccion = modelo.predict([[tiempo_para_prediccion_segundos]])
    # Y = prediccion[0][0]
    # print(f"Precio predicho para el día {dias_atras} en el futuro: {Y}")
    # print('terminando de calcular indice en el worker')
    # return {"indice": Y}


    # print('empezando tarea en el worker')
    # time.sleep(20)
    # print('terminando tarea en el worker')
    # return {"message": 'Se termino de calcular el indice en el worker!'}


# 1d5fe8ba-1f05-4072-80fa-a803d8f9627a
# c478a376-9f19-416e-a238-654da65f65af
# 1773467a-2054-4459-8e27-a7aba16f3db9

# @shared_task
# def sum_to_n_job(number):
#     result = sum_to_n(number)
#     return result
