import express from 'express';
import { CategoryController } from '../../controllers/categoryController';
const categoryController = new CategoryController();
import { jwtMiddleware, permissionMiddleware} from '../../middlewares';
import * as categoryRequest from '../../requests/category';

const router = (router:any)=> {
	router.get('/categories',
		 jwtMiddleware,
        permissionMiddleware([]),
		categoryController.getAll
	);

	router.post('/categories',
		jwtMiddleware,
        permissionMiddleware(['admin']),
		categoryRequest.create(),
		categoryController.create
	);

	router.delete('/categories/:id',
		jwtMiddleware,
        permissionMiddleware(['admin']),
		categoryController.delete
	);
	return router;

}



export default router;