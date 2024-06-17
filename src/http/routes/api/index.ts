import express from 'express';
import UserRoutes from './userRoutes';
import ThemeRoutes from './themeRoutes';
import AuthRoutes from './authRoutes';
import ContentRoutes from './contentRoutes';
import CategoryRoutes from './categoryRoutes';

const routerStore = () => {

let router = express.Router();

  router = UserRoutes(router);

  router = ThemeRoutes(router);
  router = AuthRoutes(router);
  router = ContentRoutes(router);
  router = CategoryRoutes(router);

  return router;
}

export default routerStore;