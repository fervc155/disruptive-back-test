import express from 'express';
import { ThemeController } from '../../controllers/themeController';
const themeController = new ThemeController();
import { jwtMiddleware, permissionMiddleware} from '../../middlewares';
import * as themeRequest from '../../requests/theme';

const router = (router:any)=> {
	router.get('/themes',
		themeController.getAll
	);


	router.get('/themes/search',
		themeController.search
	);

	router.get('/themes/:id',
		themeController.getById
	);



	router.post('/themes',
		jwtMiddleware,
        permissionMiddleware(['admin']),
		themeRequest.create(),
		themeController.create
	);

	router.delete('/themes/:id',
		jwtMiddleware,
        permissionMiddleware(['admin']),
		themeController.delete
	);
	return router;

}



export default router;