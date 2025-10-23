import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { engine } from 'express-handlebars';
import path from 'path';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import viewsRouter from './src/routes/views.router.js';
import ProductManager from './src/managers/ProductManager.js';

const __dirname = path.resolve();
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

// Hacemos io accesible en rutas HTTP:
app.set('io', io);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Sockets – también permitimos crear/eliminar por WS (sugerido por la consigna)
const pm = new ProductManager(__dirname);
io.on('connection', async (socket) => {
  const products = await pm.getAll();
  socket.emit('products:update', products);

  socket.on('product:create', async (body, cb) => {
    try {
      const created = await pm.create(body);
      const list = await pm.getAll();
      io.emit('products:update', list);
      cb && cb({ ok: true, created });
    } catch (err) {
      cb && cb({ ok: false, error: err.message });
    }
  });

  socket.on('product:delete', async (id, cb) => {
    try {
      const ok = await pm.delete(id);
      const list = await pm.getAll();
      io.emit('products:update', list);
      cb && cb({ ok });
    } catch (err) {
      cb && cb({ ok: false, error: err.message });
    }
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => console.log(`Servidor listo en http://localhost:${PORT}`));
