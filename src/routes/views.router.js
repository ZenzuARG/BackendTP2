import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import path from 'path';

const router = Router();
const pm = new ProductManager(path.resolve());

router.get('/', async (_req, res) => {
  const products = await pm.getAll();
  res.render('home', { title: 'Home', products });
});

router.get('/realtimeproducts', async (_req, res) => {
  const products = await pm.getAll();
  res.render('realTimeProducts', { title: 'Productos en tiempo real', products });
});

export default router;
