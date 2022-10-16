import express from 'express';
import { findUser, createUser, getUser, logUserOut } from '../controller/users.js';

const router = express.Router();

router.post('/login', findUser);

router.post('/register', createUser);

router.get('/get', getUser);

router.get('/logout', logUserOut);


export default router;