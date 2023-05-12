/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - cellphone
 *       properties:
 *         name:
 *           type: string
 *           description: Name for User
 *         lastname:
 *           type: string
 *           description: Last Name for User
 *         email:
 *           type: string
 *           description: Email for User
 *         cellphone:
 *           type: integer
 *           description: CellPhone for User
 *       example:
 *         name: Moisés
 *         lastname: G. Rosales
 *         email: mgranciano@taxi24.com
 *         cellphone: 555555555
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Travel:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *         - IDUser
 *       properties:
 *         latitude:
 *           type: number
 *           description: latitud start travel point
 *         longitude:
 *           type: number
 *           description: longitud start travel point
 *         id:
 *           type: string
 *           description: ID User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coords:
 *       type: object
 *       required:
 *         - latitude
 *         - longitude
 *       properties:
 *         latitude:
 *           type: number
 *           description: latitud finish travel
 *         longitude:
 *           type: number
 *           description: longitude finish travel
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - cellphone
 *       properties:
 *         name:
 *           type: string
 *           description: Name for User
 *         lastname:
 *           type: string
 *           description: Last Name for User
 *         email:
 *           type: string
 *           description: Email for User
 *         cellphone:
 *           type: integer
 *           description: CellPhone for User
 *       example:
 *         name: Moisés
 *         lastname: G. Rosales
 *         email: mgranciano@email.com
 *         cellphone: 555555555
 */

// Driver

/**
 * @swagger
 * tags:
 *   name: Driver
 *   description: Endpont for driver manipulation
 * /drivers:
 *   get:
 *     summary: show all drivers without filter
 *     tags: [Driver]
 *     responses:
 *       200:
 *         description: All drivers.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 * /drivers/notintravel:
 *   get:
 *     summary: show all active drivers
 *     tags: [Driver]
 *     responses:
 *       200:
 *         description: All drivers.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 * /drivers/closest/{latitude}/{longitude}:
 *   get:
 *     summary: show all active drivers specifying a starting point
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: coord latitude
 *       - in: path
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: coord longitude
 *     responses:
 *       200:
 *         description: All drivers.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 * /drivers/{id}:
 *   get:
 *     summary: Search driver for ID
 *     tags: [Driver]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID Driver
 *     responses:
 *       200:
 *         description: Driver for ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 */

// Travel

/**
 * @swagger
 * tags:
 *   name: Travel
 *   description: Endpont for Travels manipulation
 * /travels/closest/{id}/{latitude}/{longitude}:
 *   get:
 *     summary: show all available drivers specifying a starting point and ID User in specific
 *     tags: [Travel]
 *     parameters:
 *       - in: path
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: coord latitude
 *       - in: path
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: coord longitude
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID User applicant
 *     responses:
 *       200:
 *         description: All drivers.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       500:
 *         description: Some server error
 * /travels/allactivetravels:
 *   get:
 *     summary: show all active travels
 *     tags: [Travel]
 *     responses:
 *       200:
 *         description: All users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Travel'
 *       500:
 *         description: Some server error
 * /travels/starttravel:
 *   post:
 *     summary: Create a new Travel
 *     tags: [Travel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Travel'
 *     responses:
 *       200:
 *         description: Travel started
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Travel'
 *       500:
 *         description: Some server error
 * /travels/finishtravel/{id}:
 *   put:
 *     summary: Create a new Travel
 *     tags: [Travel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coords'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID Travel in curse
 *     responses:
 *       200:
 *         description: Travel started
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Travel'
 *       500:
 *         description: Some server error
 */

// User

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpont for user manipulation
 * /users:
 *   get:
 *     summary: show all users without filter
 *     tags: [User]
 *     responses:
 *       200:
 *         description: All users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Search user for ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID User
 *     responses:
 *       200:
 *         description: User for id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: DataBase
 *   description: Endpont for DataBase
 * /seeds:
 *   get:
 *     summary: seed for travels , user and drivers
 *     tags: [DataBase]
 *     responses:
 *       200:
 *         description: seed.pug
 *       500:
 *         description: Some server error
 */