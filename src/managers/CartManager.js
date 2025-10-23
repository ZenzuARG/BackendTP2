import { readJSON, writeJSON, ensureFile } from '../utils/fileStore.js';
import path from 'path';
import crypto from 'crypto';

export default class CartManager {
  constructor(baseDir = path.resolve()) {
    this.file = path.join(baseDir, 'data', 'carts.json');
    ensureFile(this.file);
  }

  #newId(){ return crypto.randomUUID(); }

  async getAll(){ return readJSON(this.file); }

  async getById(id){
    const list = await this.getAll();
    return list.find(c => c.id === id) || null;
  }

  async create(){
    const list = await this.getAll();
    const cart = { id: this.#newId(), products: [] };
    list.push(cart);
    await writeJSON(this.file, list);
    return cart;
  }

  async addProduct(cid, pid, qty = 1){
    const list = await this.getAll();
    const idx = list.findIndex(c => c.id === cid);
    if (idx === -1) return null;
    const cart = list[idx];
    const found = cart.products.find(p => p.product === pid);
    if (found) found.quantity += Number(qty) || 1;
    else cart.products.push({ product: pid, quantity: Number(qty) || 1 });
    list[idx] = cart;
    await writeJSON(this.file, list);
    return cart;
  }
}
