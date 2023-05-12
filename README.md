<a name="inicio"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Taxi24</h3>

  <p align="center">
    Construcción de un API REST con el lenguaje de programación NodeJs , debe de proporcionar una funcionalidad para Conductores, Usuario y los Viajes entre estos dos.
    <br />
    <br />
    ·
    <a href="https://github.com/mgranciano/challenge_taxi24/issues">Report Bug</a>
    ·
    <a href="https://github.com/mgranciano/challenge_taxi24/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#para-inicar">Para iniciar</a>
      <ul>
         <li><a href="#prerequisitos">Prerequisitos</a></li>
         <li><a href="#validación">Validación</a></li>
         <li><a href="#ejecutando-la-base-de-datos">Ejecutando la base de datos</a></li>
         <li><a href="#ejecutando-el-código">Ejecutando el código</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

[![Product Name Screen Shot][product-screenshot]](https://github.com/mgranciano/challenge_taxi24)


<p align="right">(<a href="#inicio">Inicio</a>)</p>



### Construido con

* [![NodeJs][NodeJs]][NodeJs-url]
* [![Express][Express]][Express-url]
* [![Swagger][Swagger]][Swagger-url]
* [![Docker][Docker]][Docker-url]
* [![mongoose][mongoose]][mongoose-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* JEST

<p align="right">(<a href="#inicio">Inicio</a>)</p>



<!-- GETTING STARTED -->
## Para iniciar

### Prerequisitos

Deberá de tener instalado lo siguiente de acuerdo a su equipo ( Windows , Linux , Mac )

* [NodeJs](https://nodejs.org/en/download)
* [Docker](https://www.docker.com/products/docker-desktop)
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Git](https://git-scm.com)

### Validación

- [ ] Git
  1. Ejecutar desde una terminal el siguiente comando   
   ```sh
     git --version
   ```  
  2. Debera tener un resultado similar a la siguiente imagen
- [ ] NodeJs
  1. Ejecutar desde una terminal el siguiente comando   
   ```sh
     node -v
   ```  
   2. Debera tener un resultado similar a la siguiente imagen
    [![Node_Version Screen Shot][node-version-screenshot]](https://github.com/mgranciano/challenge_taxi24)
<br />

- [ ] Docker
  1. Ejecutar desde una terminal el siguiente comando   
   ```sh
     docker-compose -v
   ```  
   2. Debera tener un resultado similar a la siguiente imagen
    [![Docker_Version Screen Shot][docker-version-screenshot]](https://github.com/mgranciano/challenge_taxi24)
    
<br />

### Ejecutando la base de datos

1. Clonar el repositorio dentro de una terminal seleccionar una ubicación que se tenga permisos de escritura y ejecutar el siguiente código
   ```sh
   git clone https://github.com/mgranciano/challenge_taxi24.git
   ```
   <br />

2. Entrar en la carpeta genera y a la carpeta `docker` , estando situados en esta carpeta se tendra que ejecutar el comando `docker-compose` , si todo esta correcto la base de datos quedara levantada 

   ```sh
    cd challenge_taxi24/docker
    docker-compose up -d
    docker ps
   ```

### Ejecutando el código

1. Entrar la carpeta generada en el paso de clonación que se realizo en el punto 1 de la base de datos (<a href="#ejecutando-la-base-de-datos">Ejecutando la base de datos</a>) dentro entrar a `myapp` y ejecutar `npm install`
   ```sh
   cd challenge_taxi24/myapp
   npm install
   ```
   <br />
   
   [![Node Screen Shot][node-screenshot]](https://github.com/mgranciano/challenge_taxi24)
   
   <br />
2. Entrar en el código y generar una copia del archivo `example.env` con el nombre  `.env`, aqui se deberá ajustar los valores siguientes
   <br />
   ```js
    #Puerto donde se iniciara el API
    PORT=3001

    #Información de la base de datos usuario , contraseña , ip y puerto de la base de datos que se configuro previamente
    DB_USER=helpdev
    DB_PASS=123456
    DB_HOST=localhost
    DB_PORT=27017

    #Coordenadas en latitud y longitud para iniciar la población de la base de datos , tome como referencia una ubicación al azar como las de google maps
    LATITUDE=19.429350
    LONGITUDE=-99.178106
   ```
   <br />
   
   Para las coordenadas antes mencionadas se pueden sacar de google maps dando click en cualquier punto y en el flotante aparecen :
   
   [![Coordenadas Shot][coordenadas-screenshot]](https://github.com/mgranciano/challenge_taxi24)
   
   
3. Para ejecutar el código  
   ```sh
   npm run start
   ```
<br />
<p align="right">(<a href="#inicio">Inicio</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Conductores
    - [ ] Obtener una lista de todos los conductores
    - [ ] Obtener una lista de todos los conductores disponibles
    - [ ] Obtener una lista de todos los conductores disponibles en un radío de 3 Km para una ubicación especifica
    - [ ] Obtener un conductor especifico por su ID
- [ ] Usuarios
    - [ ] Obtener una lista de todos los usuarios
    - [ ] Obtener un pasajero especifico por su ID
    - [ ] Para un usuario solicitando un viaje , obtener una lista de los 3 conductores más cercanos al punto de partida
- [ ] Viajes
    - [ ] Crear una solicutd de Viaje y asignar un conductor
    - [ ] Completar un viaje en proceso
    - [ ] Obtener una lista de todos los viajes en curso

<p align="right">(<a href="#inicio">Inicio</a>)</p>



<!-- USAGE EXAMPLES -->
## Uso
Para la visualización de los puntos anteriores se proporciona un archivo de exportación de **_Postman_** dentro del repositorio llamado[`Taxi24Challenge.postman_collection.json`](https://github.com/mgranciano/challenge_taxi24/blob/master/postman/Taxi24Challenge.postman_collection.json) que contiene los _request_ a todas las rutas expuestas.

<br />

[![Postman_Screen Shot][postman-screenshot]](https://github.com/mgranciano/challenge_taxi24)

<br />

------aqui nombrar el swagger

Dentro de estos _request_ se debera de ejecutar el llamada a _seeds_ , ya que este contiene una logica para cargar aleatoriamente 20 Conductores en un diametro máximo 10 kilometros y 5 en diametro máximo de 4 kilomentos apartir de las coordenadas que se configuraron en el archivo `.env` , tambien de los 20 primeros conductores se generan 15 usuarios y se les asigna un viaje con su conductor más cercano.


### Usuarios

1. Para generar un conductor se requiere el _request_ `{{url}}/api/users` es de tipo `**post**` , este regresara el usuario generado nuevo conteniendo el ID que sera necesario para poder buscar la informaciòn de este, y requiere de un body de la siguiente forma :

  ```json
   {
    "name":"<String>",
    "lastname":"<String>",
    "email":"<String>",
    "cellphone": <Number>
   }
  ```
  
3. Para validar la informaciòn de este usuario más adelante se utilizará el _request_ `{{url}}/api/users/:id` es de tipo `**get**`, donde _:id_ corresponde a parte de la informaciòn del punto anterior.
4. Para obtener todos los usuario hasta el momento se utilizará el _request_ `{{url}}/api/users` es de tipo `**get**`, este retornara todos los usuarios que existen hasta el momento.
5. Para obtener los 3 condutores más cercanos se utilizara el _reques_ `{{url}}/api/travels/closest/:id/:logitud/_latitud` es de tipo `**get**`, donde _:id_ corresponde al ID de un usuario existente y _:latitud_ y _:longitud_ corresponden a coordenadas geograficas (como los de google maps) 

<p align="right">(<a href="#inicio">Inicio</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: [https://www.linkedin.com/in/moises-granciano-2840b6197](https://www.linkedin.com/in/moises-granciano-2840b6197)
[contributors-shield]: https://img.shields.io/github/contributors/mgranciano/challenge_taxi24.svg?style=for-the-badge
[contributors-url]: [https://github.com/mgranciano/challenge_taxi24/graphs/contributors](https://github.com/mgranciano/challenge_taxi24/graphs/contributors)
[stars-shield]: https://img.shields.io/github/stars/mgranciano/challenge_taxi24.svg?style=for-the-badge
[stars-url]: https://github.com/mgranciano/challenge_taxi24/stargazers
[product-screenshot]: img/screen02.png
[node-version-screenshot]: img/node01.png
[node-screenshot]: img/node02.png
[postman-screenshot]: img/postman01.png
[docker-version-screenshot]: img/docker01.png
[coordenadas-screenshot]: img/coords01.png
[NodeJs]: https://img.shields.io/badge/nodejs-C0C0C0?style=for-the-badge&logo=nodedotjs&logoColor=008000
[NodeJs-url]: https://nodejs.org/
[Express]: https://img.shields.io/badge/expressjs-C0C0C0?style=for-the-badge&logo=expressjs&logoColor=white
[Express-url]: https://expressjs.com/
[Swagger]: https://img.shields.io/badge/swagger-C0C0C0?style=for-the-badge&logo=swagger&logoColor=33FF66
[Swagger-url]: https://swagger.io/
[Docker]: https://img.shields.io/badge/docker-C0C0C0?style=for-the-badge&logo=docker&logoColor=0066FF
[Docker-url]: https://www.docker.com/
[mongoose]: https://img.shields.io/badge/mongoosee-C0C0C0?style=for-the-badge&logo=mongooseedotjs&logoColor=CC3333
[mongoose-url]: https://mongoosejs.com/
[MongoDB]: https://img.shields.io/badge/mongodb-C0C0C0?style=for-the-badge&logo=mongodb&logoColor=00FF66
[MongoDB-url]: https://www.mongodb.com/

