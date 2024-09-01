import express from 'express';
const router = express.Router();
import { register, login } from  '../controllers/authController.js';

// /**
//  * @swagger
//  * /register:
//  *   post:
//  *     summary: Register a new user
//  *     description: This endpoint registers a new user by accepting their name, email, and password.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: The user's name.
//  *                 example: John Doe
//  *               email:
//  *                 type: string
//  *                 description: The user's email.
//  *                 example: johndoe@example.com
//  *               password:
//  *                 type: string
//  *                 description: The user's password.
//  *                 example: StrongPassword123
//  *               username:
//  *                 type: string
//  *                 description: The user's username.
//  *                 example: adiritzhakii
//  *               birthYear:
//  *                 type: number
//  *                 description: The user's birthYear.
//  *                 example: 1999
//  *               address:
//  *                 type: string
//  *                 description: The user's address.
//  *                 example: Yanuv
//  *               gender:
//  *                 type: string
//  *                 description: The user's gender.
//  *                 enum:
//  *                  - Male
//  *                  - Female
//  *                  - Unknown
//  *                 example: male
//  *               isSeller:
//  *                 type: boolean
//  *                 description: The user's password.
//  *                 example: true
//  *
//  *     responses:
//  *       201:
//  *         description: User registered successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: User registered successfully
//  *       500:
//  *         description: Internal server error.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Something went wrong, please try again later
//  */
router.post('/register', register);

// /**
//  * @swagger
//  * /auth:
//  *   /login:
//      *   post:
//      *     summary: login user
//      *     requestBody:
//      *       required: true
//      *       content:
//      *         application/json:
//      *           schema:
//      *             type: object
//      *             properties:
//      *               username_or_email:
//      *                 type: string
//      *                 description: Username or Email of the user
//      *                 example: adiritzhakii
//      *               password:
//      *                 type: string
//      *                 description: The user's password
//      *                 example: StrongPassword123
//      *     responses:
//      *       200:
//      *         description: A Token
//      *         content:
//      *           application/json:
//      *             schema:
//      *               type: object
//      *               properties:
//      *                 token:
//      *                   type: string
//      *                   description: jwt token for the user.
//      *                   example: asd
//      *
//      */
router.post('/login', login);

export const authRoutes = router;
