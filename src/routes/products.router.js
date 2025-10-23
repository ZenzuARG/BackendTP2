import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import path from 'path';

const router = Router();
const pm = new ProductManager(path.resolve());

router.get('/', async (_req, res) => {
  try {
    const products = await pm.getAll();
    res.json({ status: 'success', payload: products });
  } catch (err) { res.status(500).json({ status: 'error', error: err.message }); }
});

router.get('/:pid', async (req, res) => {
  try {
    const prod = await pm.getById(req.params.pid);
    if (!prod) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    res.json({ status: 'success', payload: prod });
  } catch (err) { res.status(500).json({ status: 'error', error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const created = await pm.create(req.body);
    const io = req.app.get('io');
    if (io) io.emit('products:update', await pm.getAll());
    res.status(201).json({ status: 'success', payload: created });
  } catch (err) { res.status(400).json({ status: 'error', error: err.message }); }
});

router.put('/:pid', async (req, res) => {
  try {
    const updated = await pm.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    const io = req.app.get('io');
    if (io) io.emit('products:update', await pm.getAll());
    res.json({ status: 'success', payload: updated });
  } catch (err) { res.status(400).json({ status: 'error', error: err.message }); }
});

router.delete('/:pid', async (req, res) => {
  try {
    const ok = await pm.delete(req.params.pid);
    if (!ok) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    const io = req.app.get('io');
    if (io) io.emit('products:update', await pm.getAll());
    res.json({ status: 'success', payload: true });
  } catch (err) { res.status(500).json({ status: 'error', error: err.message }); }
});

export default router;
