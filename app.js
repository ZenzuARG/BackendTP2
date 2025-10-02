import express from 'express';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  res.json({ status: 'ok', msg: 'API Productos & Carritos - Entrega 1', docs: '/README' });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
