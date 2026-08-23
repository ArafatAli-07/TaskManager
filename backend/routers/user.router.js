import express from 'express';
import { login, logout, regiser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/register').post(regiser);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router