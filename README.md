# 🧩 Entrega N°2 – Backend (Handlebars + Websockets)

Este proyecto corresponde a la **Entrega 2 del curso de Backend** en **Coderhouse**.
Extiende la API de productos y carritos creada en la entrega anterior, integrando:

* Motor de plantillas **Handlebars** para renderizar vistas dinámicas.
* Comunicación en tiempo real con **Socket.IO**.

---

## 🚀 Objetivo

Configurar el proyecto para que trabaje con **Handlebars y WebSocket**, permitiendo visualizar y actualizar productos en tiempo real desde el navegador.

---

## 🧠 Funcionalidad general

### ✅ Home (`/`)

* Renderiza todos los productos almacenados en `products.json`.
* Se actualiza al iniciar el servidor, mostrando la lista completa.

### ✅ RealtimeProducts (`/realtimeproducts`)

* Muestra la misma lista, pero actualizada **en tiempo real** mediante WebSocket.
* Permite:

  * Crear productos desde un formulario.
  * Eliminar productos por su ID.
* Cada operación **emite eventos** a todos los clientes conectados, actualizando la vista sin recargar.

---

## ⚙️ Tecnologías utilizadas

* Node.js
* Express.js
* Express-Handlebars
* Socket.IO
* UUID
* Nodemon

---

## 📂 Estructura del proyecto

```
backend-entrega2/
├── app.js
├── package.json
├── .gitignore
├── /src
│   ├── /routes
│   │   ├── products.router.js
│   │   ├── carts.router.js
│   │   └── views.router.js
│   ├── /managers
│   │   ├── ProductManager.js
│   │   └── CartManager.js
│   └── /utils
│       └── fileHandler.js
├── /data
│   ├── products.json
│   └── carts.json
├── /public
│   ├── styles.css
│   └── js/
│       └── realtime.js
└── /views
    ├── home.handlebars
    ├── realtimeproducts.handlebars
    └── layouts/main.handlebars
```

---

## 🧩 Instalación y ejecución

```
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor
npm run dev

# 3. Abrir en el navegador
http://localhost:8080
```

---

## 🧪 Pruebas básicas

### 🔹 Crear producto (HTTP)

```
POST http://localhost:8080/api/products
Content-Type: application/json
```

```json
{
  "title": "Teclado Mecánico",
  "description": "Switches rojos",
  "code": "KB-RED-001",
  "price": 89999.99,
  "status": true,
  "stock": 10,
  "category": "periféricos",
  "thumbnails": ["/imgs/teclado.png"]
}
```

✔️ Verás el nuevo producto reflejado automáticamente en la vista **Realtime**.

---

### 🔹 Eliminar producto (HTTP)

```
DELETE http://localhost:8080/api/products/:pid
```

✔️ El producto se eliminará tanto del archivo `products.json` como de la lista en tiempo real.

---

### 🔹 Realtime (WebSocket)

Desde la vista `/realtimeproducts` podés:

* Crear productos con el formulario → se agregan al instante.
* Eliminar por ID → desaparecen sin recargar la página.

---

## 💾 Persistencia

* Los productos y carritos se guardan usando **FileSystem** (`products.json`, `carts.json`).
* Las vistas se renderizan con datos persistentes.

---

## 🎨 Estilo visual

* Tema oscuro moderno con hover effects y diseño tipo *card grid*.
* Totalmente responsive.
* Footer personalizado:

  ```
  ⚙️ Proyecto Backend — Entrega 2 | Desarrollado por ZenzuARG © 2025
  ```

---

## 🧾 Checklist de corrección (Coderhouse)

| Aspecto         | Estado      |
| --------------- | ----------- |
| Productos       | ✅ Realizado |
| Websocket       | ✅ Realizado |
| Rutas separadas | ✅ Realizado |
| Persistencia    | ✅ Correcta  |
| Estilo visual   | ✅ Extra     |

**Nivel obtenido esperado:** 🟢 Óptimo (100 pts)

---

## 👨‍💻 Autor

**Zenon Zuliani (ZenzuARG)**
Entrega N°2 – Curso Backend Coderhouse 2025
Proyecto académico con fines educativos.
