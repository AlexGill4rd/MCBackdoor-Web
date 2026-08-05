

**Aviso: Este proyecto está abandonado.**

Este proyecto ya no se mantiene activamente. Por favor, considera usar soluciones alternativas o bifurcar el repositorio si deseas continuar con el desarrollo. Estoy trabajando activamente en un nuevo sistema de panel de control para servidores con muchas características para usar en tu servidor. NO voy a hacer otra puerta trasera.

# Proyecto de puerta trasera para servidores de Minecraft
La idea del complemento es crear una puerta trasera en un servidor a través de un plugin. El plugin se inyecta en un complemento normal que el propietario del servidor coloca en su servidor. Cuando el plugin llega a la carpeta de plugins y el propietario inicia el servidor, tendré acceso remoto a varias funciones que he incorporado a través de este plugin.

## ¿Cuál es el objetivo?
Desarrollé el plugin porque estaba en mi lista de deseos hacer un RAT algún día. Pero no un RAT que te permita acceder a la computadora de alguien, sino un panel de control remoto que me permita controlar el servidor.

## ¿Por qué el plugin no está en inglés?
El plugin está en neerlandés para reducir el riesgo de que sea utilizado con fines maliciosos. Además, yo también soy neerlandés.

## Aprendizaje y Ayuda
Si quieres aprender algo, no tengas miedo de echarle un vistazo al código y hacer una PR si lo deseas.

## ¿Qué utilicé para el proyecto?
Para el proyecto utilicé varios frameworks y lenguajes de programación útiles e importantes.

### Java
Utilicé Java para escribir el plugin en Minecraft. En el plugin me comunicaba con sockets a la página web.
### Socket.IO
Socket.IO se utiliza para controlar todo el sistema de comunicación del proyecto. Siempre que sea necesario, el cliente Java reenviará la información solicitada al servidor API y recibirá una respuesta si se desea. De este modo, el cliente web es capaz de obtener información de, por ejemplo, los jugadores.
### React
Utilicé React para construir la interfaz de usuario de la página web. Un framework extremadamente útil para crear una página web fácil de usar.
### NodeJS
Utilizo NodeJS para controlar el backend y la comunicación. El servidor de Minecraft siempre se conectará primero al servidor NodeJS con los datos. Y luego el servidor NodeJS procesará cuál es el destino final de los datos.
### SASS
Utilizo Sass para facilitar el estilizado de CSS. En Sass tienes la posibilidad de crear funciones y aplicar herencia. Lo que lo hace muy fácil. Sass simplemente convierte el texto a CSS.
### Typescript
Utilizo TypeScript en lugar de JavaScript. TypeScript es lo mismo que JavaScript pero con algunas características adicionales. Por ejemplo, tienes que asignar variables a un tipo y las propiedades funcionan de manera diferente.

### MySQL
Utilizo MySQL para almacenar datos de jugadores y otra información importante. Si buscas en el código, encontrarás los nombres de las tablas y los datos de inicio de sesión.

## ¿Qué funciones puedes encontrar?
En el proyecto puedes encontrar una gran variedad de adiciones. A continuación se muestra un resumen:

### Lista de servidores
En la pantalla de inicio puedes ver todos los servidores que están infectados con el plugin.
![image](https://user-images.githubusercontent.com/57497005/180844499-dd5bc6d9-fde6-43ed-af9a-73f41c82b7b0.png)


## Panel de Jugador
- Obtener la lista de jugadores
- Convertir a un jugador en operador
- Personalizar el modo de juego de un jugador
- Causar un fallo en el servidor
- Expulsar a un jugador del servidor
- Teletransportar a un jugador a una ubicación
- Agregar a un jugador a la lista blanca
- Matar a un jugador
- Prohibir a un jugador
- Enviar spam a un jugador con mensajes privados
- Filtrar los datos de un jugador
- Ajustar el nivel de experiencia de un jugador
- Opción para expulsar al jugador cada vez que se una
- Ajustar el inventario de un jugador EN VIVO
- Ajustar el cofre del ender de un jugador EN VIVO
- Guardar artículos que encuentres interesantes ([Imagen que ilustra el panel de guardado](https://user-images.githubusercontent.com/57497005/174077946-0e5be262-154e-48ae-9a34-121c621ffd0b.png))
- Soltar artículos del inventario
- Editar un artículo ([Imagen que ilustra el panel de edición](https://user-images.githubusercontent.com/57497005/174077302-d3f9eac9-6a25-49a1-9bd4-1414fadb8b05.png))
> Cambiar nombre, Lore, Encantamientos

- Dar un artículo de los guardados a un jugador
- Editar la experiencia del jugador
- Obtener la experiencia del jugador

### Panel de Irritación
- Teletransportar al jugador a una ubicación aleatoria
- Restablecer el nivel de hambre del jugador
- Rotar al jugador 180°
- Generar una telaraña debajo del jugador
- Cambiar la velocidad del jugador
- Dar al jugador un Earrape
- Prender fuego al jugador
- Congelar al jugador
- Dejar la salud del jugador muy baja
- Hacer que el jugador diga algo o ejecute un comando
- Teletransportar al jugador al cielo
- Hacer que el jugador caiga al vacío
- Hacer invisible al jugador
- Hacer que los jugadores alrededor sean invisibles para el jugador
- Opción para realizar múltiples acciones a la vez

![Page](https://user-images.githubusercontent.com/57497005/174078265-7cea0a87-e337-40bd-9d3c-f162e47a4a6d.png)
### Información del jugador
- Nombre del jugador
- UniqueID del jugador
- Dirección IP pública del jugador
- Estado de operador del jugador
- Salud del jugador
- Modo de juego del jugador
- Ubicación del jugador
- Mundo del jugador
- Dirección IP del servidor del jugador

![Page](https://user-images.githubusercontent.com/57497005/175658466-0133aa9d-5273-40f0-baf8-e12834fe4044.png)
## Panel del Servidor
### Tablero
- Obtener la dirección IP del servidor
- Obtener el MOTD del servidor
- Cambiar la versión del servidor. (Es decir, el jar principal)
- Cerrar el servidor
- Recargar el servidor
- Ver el chat del servidor
- Filtrar el chat. (En mensajes y jugadores)
- Personalizar el icono del servidor
- Ver el número de jugadores
- Ver el consumo de memoria
- Obtener los TPS del servidor
- Obtener el entorno donde se aloja el servidor
- Obtener el número de núcleos del CPU
- Obtener la lista de jugadores

![Page](https://user-images.githubusercontent.com/57497005/180844330-9cce763e-2c79-4242-a424-3a240b5649ae.png)
### Consola ([Page](https://user-images.githubusercontent.com/57497005/175658236-97155eac-999e-4dee-901c-c9690cebbf12.png))
- Ver la consola en vivo del servidor
- Ejecutar comandos en la consola
- Filtrar la consola por mensajes
### Explorador de archivos
- Ver los archivos del servidor
- Subir un archivo en un directorio
- Descargar un archivo del servidor
- Editar un archivo del servidor
- Obtener información sobre un archivo
- Eliminar archivos
- Eliminar carpetas
- Abrir directorios
- Editar un archivo y guardarlo en el servidor

![Page](https://user-images.githubusercontent.com/57497005/175658593-4635ae01-c577-4be9-b6ae-0180134a33ed.png)
### Menú de Prohibidos ([Page](https://user-images.githubusercontent.com/57497005/175658165-7b6c6d68-e2cd-4bae-ac11-1f4132f117f9.png))
- Obtener a los jugadores prohibidos
- Permitir a un jugador
- Obtener información sobre un jugador prohibido
### Menú de Lista Blanca ([Page](https://user-images.githubusercontent.com/57497005/175658219-2394450c-1fcd-4c77-b8db-25e6d61f6dc5.png))
- Obtener a los jugadores en la lista blanca del servidor
- Agregar un jugador a la lista blanca. (También jugadores que no se han unido previamente al servidor)
- Eliminar jugadores de la lista blanca
- Buscar un jugador
- Obtener a todos los jugadores que se han unido alguna vez al servidor como opción para agregar a la lista blanca
### Generador de Mobs
Esto te permite generar diferentes tipos de mobs con sus propias configuraciones en el mundo. La ubicación puede establecerse según tus deseos.
- Seleccionar tipos de mobs
- Cambiar el nombre visible (displayname)
- Establecer la cantidad de generación
- Establecer la ubicación de generación
> Mundo / Jugador
- Configuraciones
> Glow, Godmode, Gravedad, Customname visible

![Page](https://user-images.githubusercontent.com/57497005/180843849-81267663-a11e-4409-a54a-12939865fb6a.png)

### Edición de Armadura
Hay una nueva función donde es posible realizar diferentes acciones en la armadura de un jugador. A continuación se muestra una lista de las nuevas opciones de control.
- Se agregó un visor de skin. Ahora puedes ver el skin del jugador aquí.
- Puedes eliminar todos los artículos que lleva el jugador y que tiene en su mano secundaria.
- ¡Puedes ver toda la armadura que lleva el jugador y qué tiene en su mano secundaria!
- Siguiendo con el skin del jugador. También puedes descargarlo aquí.
- Volviendo a los artículos. Puedes equipar el artículo, editarlo, soltarlo (el jugador ya no podrá recogerlo), eliminarlo, ver información y finalmente guardarlo en el almacén para acceder a él más tarde.

#### ¿Cómo se ve el nuevo menú ahora?
![image of panel](https://user-images.githubusercontent.com/57497005/182044684-5dd91679-400e-44bd-8c8e-37edd8a75e20.png)


Más características por venir, pero mis manos no pueden escribir más rápido.

## Reglas
El plugin está hecho solo con fines educativos. Está prohibido usarlo en la práctica. Lo hice solo para ampliar mis conocimientos. Por esta razón, decidí omitir ciertas cosas para que no sea posible su uso por parte de un script kiddy.

Puedes juzgar mi código, pero ten en cuenta que esto fue hecho con 5 meses de experiencia. Mantén tu juicio razonable.
