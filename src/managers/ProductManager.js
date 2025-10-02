import { readJSON, writeJSON, ensureFile } from '../utils/fileStore.js';
import path from 'path';
import crypto from 'crypto';

export default class ProductManager {
  constructor(baseDir = path.resolve()) {
    this.file = path.join(baseDir, 'data', 'products.json');
    ensureFile(this.file);
  }

  #newId() {
    return crypto.randomUUID(); // evita colisiones
  }

  async getAll() {
    return readJSON(this.file);
  }

  async getById(id) {
    const list = await this.getAll();
    return list.find(p => p.id === id) || null;
  }

  #validate(body, { partial = false } = {}) {
    const allowed = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    const payload = {};

    for (const k of Object.keys(body || {})) {
      if (!allowed.includes(k)) {
        throw new Error(`Campo no permitido: ${k}`);
      }
    }

    if (!partial) {
      const required = ['title', 'description', 'code', 'price', 'stock', 'category'];
      for (const r of required) {
        if (body[r] === undefined || body[r] === null || body[r] === '') {
          throw new Error(`Falta campo requerido: ${r}`);
        }
      }
    }

    payload.title = body.title?.toString();
    payload.description = body.description?.toString();
    payload.code = body.code?.toString();
    if (body.price !== undefined) payload.price = Number(body.price);
    if (body.status !== undefined) payload.status = Boolean(body.status);
    if (body.stock !== undefined) payload.stock = Number(body.stock);
    payload.category = body.category?.toString();
    if (body.thumbnails !== undefined) {
      if (!Array.isArray(body.thumbnails)) throw new Error('thumbnails debe ser arreglo de strings');
      payload.thumbnails = body.thumbnails.map(String);
    }

    return payload;
  }

  async create(body) {
    const list = await this.getAll();
    const payload = this.#validate(body);

    // Defaults
    payload.status = payload.status ?? true;
    payload.thumbnails = payload.thumbnails ?? [];

    // id autogenerado
    const prod = { id: this.#newId(), ...payload };

    // Evitar duplicación por code (opcional pero útil)
    if (list.some(p => p.code === prod.code)) {
      throw new Error('Ya existe un producto con ese code');
    }

    list.push(prod);
    await writeJSON(this.file, list);
    return prod;
  }

  async update(id, body) {
    const list = await this.getAll();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;

    // Prohibir cambios de id
    if ('id' in body) delete body.id;

    const payload = this.#validate(body, { partial: true });
    const updated = { ...list[idx], ...payload };
    list[idx] = updated;
    await writeJSON(this.file, list);
    return updated;
  }

  async delete(id) {
    const list = await this.getAll();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return false;
    list.splice(idx, 1);
    await writeJSON(this.file, list);
    return true;
  }
}
