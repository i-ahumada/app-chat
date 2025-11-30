# Chat Privado con IDs Temporales (app-chat)

Aplicación desarrollada con **Next.js + React**, que permite chats privados entre dos usuarios identificados por **IDs temporales** generados automáticamente. Los mensajes se actualizan en tiempo real utilizando **Server-Sent Events (SSE)**.

## ✔️ Funcionalidades

* **Generación automática de un ID temporal único** al ingresar a la aplicación.
* **Inicio de chat privado** ingresando el ID temporal de otra persona.
* **Actualización en tiempo real mediante SSE** para mostrar mensajes al instante entre ambos participantes.
* **Finalización del chat** por cualquiera de los dos usuarios:

  * Se elimina completamente la conversación del archivo JSON.
  * Se impide que ambos usuarios sigan enviando mensajes.
  * Se muestra un mensaje indicando que el chat terminó.
* **Guardado de conversaciones activas** en una base de datos (archivo JSON).

## Tecnologías

* Next.js
* React
* Axios
* Server-Sent Events (SSE)
* JSON como base de datos temporal

