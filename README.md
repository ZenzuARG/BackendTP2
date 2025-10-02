# Entrega N°1 – Backend (API Productos & Carritos)

Este proyecto corresponde a la **Entrega 1** del curso de Backend.  
Consigna: desarrollar un servidor en **Node.js + Express** que gestione productos y carritos, con persistencia en el sistema de archivos.

---

## ¿Qué hay que entregar?
- **Repositorio en GitHub** con:
  - Código fuente completo del proyecto (sin `node_modules`).
  - `package.json` con dependencias.
  - `.gitignore` configurado.
  - `README.md` explicativo.
- No se requiere front-end visual, las pruebas se hacen con **Postman** o similar.

---

## Estructura del proyecto
backend-tp-entrega1/
├─ package.json
├─ app.js
├─ .gitignore
├─ README.md
├─ data/
│  ├─ products.json
│  └─ carts.json
└─ src/
   ├─ routes/
   │  ├─ products.router.js
   │  └─ carts.router.js
   ├─ managers/
   │  ├─ ProductManager.js
   │  └─ CartManager.js
   └─ utils/
      └─ fileStore.js

---

## Instrucciones de uso

### 1. Requisitos
- Node.js 18 o superior.

### 2. Instalación
npm i

### 3. Ejecutar servidor
npm run dev   # con nodemon
# o
npm start     # con node

Servidor disponible en: http://localhost:8080

---

## Endpoints

### Productos `/api/products`
- **GET /** → lista todos los productos.
- **GET /:pid** → obtiene un producto por ID.
- **POST /** → crea un producto (id autogenerado). Ejemplo body:
{
  "title": "Teclado Mecánico",
  "description": "Switches rojos",
  "code": "KB-RED-001",
  "price": 89999.99,
  "status": true,
  "stock": 12,
  "category": "perifericos",
  "thumbnails": ["/imgs/teclado.png"]
}
- **PUT /:pid** → actualiza un producto (no se puede cambiar el id).
- **DELETE /:pid** → elimina un producto.

### Carritos `/api/carts`
- **POST /** → crea un nuevo carrito {id, products: []}.
- **GET /:cid** → lista los productos del carrito con ese ID.
- **POST /:cid/product/:pid** → agrega un producto al carrito.  
  Si ya existe, incrementa `quantity`.

---

## Flujo mínimo de prueba en Postman

1. **POST /api/products** → crear producto → copiar `id` generado (`PID`).
2. **POST /api/carts** → crear carrito → copiar `id` generado (`CID`).
3. **POST /api/carts/:cid/product/:pid** → agregar producto al carrito.
4. **GET /api/carts/:cid** → listar productos del carrito.

Ejemplo de respuesta:
{
  "status": "success",
  "payload": [
    {
      "product": "b85fa102-e4d6-4e5b-bb5d-193f14394509",
      "quantity": 1
    }
  ]
}

---

## Checklist de la consigna
- [x] Servidor Node.js + Express en puerto 8080.
- [x] Router separado para `/api/products` y `/api/carts`.
- [x] CRUD de productos (id autogenerado, no modificable).
- [x] Gestión de carritos (crear, listar por id, agregar producto con quantity incremental).
- [x] Persistencia con FS (`products.json` y `carts.json`).
- [x] README con instrucciones de uso.

---

## Entrega
1. Subir este proyecto a un repositorio en GitHub.
2. Verificar que no esté incluida la carpeta `node_modules/`.
3. Compartir el link del repositorio como entrega final.

---

## Notas
- El proyecto ya cumple con los requisitos de la **Entrega 1**.
- No es obligatorio tener un front-end, solo demostrar funcionamiento con Postman o curl.
