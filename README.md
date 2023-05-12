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
    <a href="https://github.com/mgranciano/challenge_taxi24"><strong>Explore the docs »</strong></a>
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
        <li><a href="#construido">Construido</a></li>
      </ul>
    </li>
    <li>
      <a href="#para-inicar">Para iniciar</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
         <li><a href="#validación">Validación</a></li>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

[![Product Name Screen Shot][product-screenshot]](https://github.com/mgranciano/challenge_taxi24)


<p align="right">(<a href="#inicio">Inicio</a>)</p>



### Construido

* [![NodeJs][NodeJs]][NodeJs-url]
* [![Express][Express]][Express-url]
* [![Swagger][Swagger]][Swagger-url]
* [![Docker][Docker]][Docker-url]
* [![mongoose][mongoose]][mongoose-url]
* [![MongoDB][MongoDB]][MongoDB-url]


<p align="right">(<a href="#inicio">Inicio</a>)</p>



<!-- GETTING STARTED -->
## Para iniciar

### Prerequisitos

En el equipo debe de tener instalado lo siguiente de acuerdo a su equipo ( Windows , Linux , Mac )

* [NodeJs](https://nodejs.org/en/download)
* [Docker](https://www.docker.com/products/docker-desktop)
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Validación

- [ ] NodeJs
  1. Ejecutar desde una terminal el siguiente comando   
   ```sh
     node -v
   ```  
   2. Debera tener un resultado similar a la siguiente imagen
    [![Node_Version Screen Shot][node-version-screenshot]](https://github.com/mgranciano/challenge_taxi24)

- [ ] Docker
  1. Ejecutar desde una terminal el siguiente comando   
   ```sh
     docker-compose -v
   ```  
   2. Debera tener un resultado similar a la siguiente imagen
    [![Docker_Version Screen Shot][docker-version-screenshot]](https://github.com/mgranciano/challenge_taxi24)

### Instalación

1. Clonar el repositorio
   ```sh
   git clone https://github.com/mgranciano/challenge_taxi24.git
   ```
2. Instalación de paquetes via npm
   ```sh
   npm install
   ```
3. Entrar en el codigo y generar una copia del archivo `example.env` con el nombre  `.env`, aqui se debera ajustar los valores siguientes
   ```js
    #Puerto donde se iniciara el API
    PORT=3001

    #Información de la base de datos usuario , contraseña , ip y puerto de la base de datos que se configuro previamente
    DB_USER=helpdev
    DB_PASS=123456
    DB_HOST=localhost
    DB_PORT=27017

    #Coordenadas en latitud y longitud para iniciar la población de la base de datos , tome como referencia una ubicación al azar
    LATITUDE=19.429350
    LONGITUDE=-99.178106
   ```

<p align="right">(<a href="#inicio">Inicio</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#inicio">Inicio</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

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
[docker-version-screenshot]: img/docker01.png
[NodeJs]: https://img.shields.io/badge/nodejs-C0C0C0?style=for-the-badge&logo=nodedotjs&logoColor=008000
[NodeJs-url]: https://nodejs.org/
[Express]: https://img.shields.io/badge/expressjs-C0C0C0?style=for-the-badge&logo=expressjs&logoColor=white
[Express-url]: https://expressjs.com/
[Swagger]: https://img.shields.io/badge/swagger-C0C0C0?style=for-the-badge&logo=swagger&logoColor=33FF66
[Swagger-url]: https://swagger.io/
[Docker]: https://img.shields.io/badge/docker-C0C0C0?style=for-the-badge&logo=docker&logoColor=0066FF
[Docker-url]: https://www.docker.com/
[mongoose]: https://img.shields.io/badge/monsoosee-C0C0C0?style=for-the-badge&logo=monsoosee&logoColor=CC3333
[mongoose-url]: https://mongoosejs.com/
[MongoDB]: https://img.shields.io/badge/mongodb-C0C0C0?style=for-the-badge&logo=mongodb&logoColor=00FF66
[MongoDB-url]: https://www.mongodb.com/

