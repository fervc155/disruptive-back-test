import express from 'express';
import { AuthController } from '../../controllers/authController';
import { jwtMiddleware} from '../../middlewares';
import * as authRequest from '../../requests/auth';

const authController = new AuthController();


const router= (router:any)=>{
	router.post('/register', authRequest.register(), authController.register);
	router.post('/login', authRequest.login(), authController.login);

	return router
}


export default router