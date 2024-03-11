## Funcionalidad y modulos del proyecto

El proyecto consiste en desarrollar una API RESTful utilizando Node.js y TypeScript para la gestión de eventos y usuarios. La API permitirá a los usuarios crear, listar, modificar y eliminar eventos, así como inscribirse en ellos. Se implementará un sistema de registro y autenticación de usuarios con diferentes roles, y se protegerán las rutas CRUD con autenticación JWT para garantizar la seguridad y el control de acceso adecuados. Los módulos y funcionalidades específicas son:

1. **Gestión de Eventos:**
   - Creación, edición y eliminación de eventos con detalles como título, descripción, fecha, hora y ubicación.
   - Listado de eventos disponibles y filtrado por fecha, ubicación o tipo de evento.
   - Los organizadores pueden editar o eliminar sus propios eventos.

2. **Registro y Autenticación de Usuarios:**
   - Sistema de registro y autenticación de usuarios.
   - Soporte para diferentes roles de usuario: asistente y organizador.
   - Control de acceso para asegurar que solo los usuarios autenticados puedan inscribirse en eventos o crear eventos si tienen el rol de organizador.

3. **Inscripción y Gestión de Entradas:**
   - Inscripción de usuarios en eventos disponibles.
   - Visualización de eventos inscritos por parte de los usuarios.
   - Los organizadores pueden ver una lista de asistentes inscritos en sus eventos.

4. **Autenticación y Autorización:**
   - Implementación de autenticación de usuarios utilizando JWT.
   - Protección de rutas CRUD con middleware de autenticación y autorización para garantizar la seguridad y el control de acceso.


## Ejecución
0. (Opcional) Si aún no tienes Yarn instalado en tu sistema, puedes instalarlo globalmente ejecutando el siguiente comando:
```
npm i -g yarn
```
1.  instala las dependencias del proyecto especificadas en el package.json ejecutando el siguiente comando en la raíz del proyecto :
```
yarn install 
```
2. ejecutar el proyecto con el siguiente comando:
```
yarn run dev
```
3. Ahora es posible acceder al servicio de API por medio de la url **http://localhost** en el puerto **3000** (**http://localhost:3000/**)



## EndPoints, entradas y salidas

### Endpoints de Usuarios:

- **GET /users**
  - Descripción: Obtiene una lista de todos los usuarios.
- **POST /users**
  - Descripción: Crea un nuevo usuario.
  - Validaciones:
    - Se espera un objeto JSON con los detalles del usuario a crear. Debe contener la siguiente estructura:
    ```
    {
        "name":"nombre del usuario",
        "email":"email valido del usuario",
        "password":"contraseña con minimo 8 caracteres del usuario"
    }
    ```
    - Los datos proporcionados deben cumplir con el esquema de validación definido.
- **PUT /users/:id**
  - Descripción: Actualiza la información de un usuario existente.
  - Parámetros de la URL: Se espera el ID del usuario que se va a actualizar.
- Validaciones:
    - Se espera un objeto JSON con los detalles del usuario a crear:
    ```
    {
        "name":"nombre del usuario",
        "email":"email valido del usuario",
        "password":"contraseña con minimo 8 caracteres del usuario"
    }
    ```
- **DELETE /users/:id**
  - Descripción: Elimina un usuario existente.
  - Parámetros de la URL: Se espera el ID del usuario que se va a eliminar.
- **GET /users/profile**
  - Descripción: Valida el perfil del usuario autenticado.
- **GET /users/:id**
  - Descripción: Obtiene la información de un usuario específico.
  - Parámetros de la URL: Se espera el ID del usuario que se quiere obtener.

### Endpoints de Eventos:

- **GET /event**
  - Descripción: Obtiene una lista de todos los eventos.
- **POST /event**
  - Descripción: Crea un nuevo evento.
  - Validaciones:
    - Se espera un objeto JSON con los detalles del evento a crear. Debe contener la siguiente estructura:
    ```
    {
        "title":"nombre unico del evento",
        "description":"descripción del evento",
        "date":"fecha del evento",
        "time":"hora del evento",
        "location":"ubicacion del evento"
    }
    ```
    - Solo los usuarios con el rol de 'organizador' pueden crear eventos.
    - Los datos proporcionados deben cumplir con el esquema de validación definido.
- **PUT /event/:id**
  - Descripción: Actualiza la información de un evento existente.
  - Parámetros de la URL: Se espera el ID del evento que se va a actualizar.
  - Validaciones:
    - Se espera un objeto JSON con los detalles del evento a crear:
    ```
    {
        "title":"nombre unico del evento",
        "description":"descripción del evento",
        "date":"fecha del evento",
        "time":"hora del evento",
        "location":"ubicacion del evento"
    }
    ```
- **DELETE /event/:id**
  - Descripción: Elimina un evento existente.
  - Parámetros de la URL: Se espera el ID del evento que se va a eliminar.
- **GET /event/:id**
  - Descripción: Obtiene la información de un evento específico.
  - Parámetros de la URL: Se espera el ID del evento que se quiere obtener.
- **GET /event/filter/location**
  - Descripción: Obtiene una lista de eventos filtrados por ubicación.
  -Body: Debe de contener un cuerpo con el siguiente objeto json:
  ```
    {
        "location":"ubicacion del evento"
    }
    ```
- **GET /event/filter/date**
  - Descripción: Obtiene una lista de eventos filtrados por fecha.
  -Body: Debe de contener un cuerpo con el siguiente objeto json:
  ```
    {
        "startDate":"rango inferior en el filtro de la fecha",
        "endDate":"rango superior en el filtro de la fecha"
    }
    ```

### Endpoints de Inscripciones:

- **GET /registration**
  - Descripción: Obtiene una lista de todas las inscripciones.
- **POST /registration**
  - Descripción: Crea una nueva inscripción a un evento.
  - Validaciones:
    - Solo los usuarios autenticados pueden inscribirse en eventos.
    - Se espera un objeto JSON con los detalles de la inscripción a crear. Debe contener la siguiente estructura:
    ```
    {
        "title":"titulo del evento existente al que se registrará",
        "email":"email del usuario existente del que se registrará al evento"
    }
    ```
    -El evento y usuario deben de existir.
- **PUT /registration/:id**
  - Descripción: Actualiza la información de una inscripción existente.
  - Parámetros de la URL: Se espera el ID de la inscripción que se va a actualizar. :
    ```
    {
        "title":"titulo del evento existente al que se registrará",
        "email":"email del usuario existente del que se registrará al evento"
    }
    ```
- **DELETE /registration/:id**
  - Descripción: Elimina una inscripción existente.
  - Parámetros de la URL: Se espera el ID de la inscripción que se va a eliminar.
- **GET /registration/:id**
  - Descripción: Obtiene la información de una inscripción específica.
  - Parámetros de la URL: Se espera el ID de la inscripción que se quiere obtener.
- **GET /registration/title**
  - Descripción: Obtiene una lista de inscripciones filtradas por título.
  -Body: Debe de contener un cuerpo con el siguiente objeto json:
  ```
    {
        "title":"titulo del evento buscado"
    }
    ```
- **GET /registration/user**
  - Descripción: Obtiene una lista de inscripciones filtradas por nombre de usuario.
  -Body: Debe de contener un cuerpo con el siguiente objeto json:
  ```
    {
        "email":"email del usuario buscado"
    }
    ```

