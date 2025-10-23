import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';
import path from 'path';

const router = Router();
const cm = new CartManager(path.resolve());
const pm = new ProductManager(path.resolve());

router.post('/', async (_req, res) => {
  try {
    const cart = await cm.create();
    res.status(201).json({ status: 'success', payload: cart });
  } catch (err) { res.status(500).json({ status: 'error', error: err.message }); }
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await cm.getById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart.products });
  } catch (err) { res.status(500).json({ status: 'error', error: err.message }); }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const qty = Number(req.body?.quantity) || 1;
    const prod = await pm.getById(pid);
    if (!prod) return res.status(404).json({ status: 'error', error: 'Producto no existe' });
    const cart = await cm.addProduct(cid, pid, qty);
    if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    res.status(201).json({ status: 'success', payload: cart });
  } catch (err) { res.status(500).json({ status: 'error', error: err.message }); }
});

export default router;
