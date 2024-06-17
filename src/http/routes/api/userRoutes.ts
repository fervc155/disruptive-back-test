import express from 'express';
import { UserController } from '../../controllers/userController';
import { jwtMiddleware,permissionMiddleware } from '../../middlewares';
import * as userRequest from '../../requests/user';




const router = (router:any)=> {
    
    const userController = new UserController();


    console.log(userController)
	router.get('/users',
        jwtMiddleware,
        permissionMiddleware(['admin']),
        userController.getAll
    );
 
    router.post('/users',
        jwtMiddleware,
        permissionMiddleware(['admin']),
        userRequest.create(),
        userController.create
    );
 
    router.delete('/users/:id',
        jwtMiddleware,
        permissionMiddleware(['admin']),
        userController.delete
    );

 
	return router;

}
export default router;