import express from 'express';
import { ContentController } from '../../controllers/contentController';
const contentController = new ContentController();
import { jwtMiddleware, permissionMiddleware} from '../../middlewares';
import * as contentRequest from '../../requests/content';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); 

const router =(router:any)=>{


	router.get('/contents',
		contentController.getAll
	);
	router.get('/contents/mine',
		jwtMiddleware,
        permissionMiddleware(['creator', 'admin']),
		contentController.mine
	);

	router.get('/contents/search',
		contentController.search
	);

	router.get('/contents/:id',
		contentController.getById
	);
	
	router.post('/contents',
		jwtMiddleware,
        permissionMiddleware(['creator','admin']),
		contentRequest.create(),
		contentController.create
	);

	router.delete('/contents/:id',
		jwtMiddleware,
        permissionMiddleware(['creator','admin']),
		contentController.delete
	);
	return router
}

export default router;