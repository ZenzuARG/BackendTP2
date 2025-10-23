import { promises as fs } from 'fs';
import path from 'path';

export async function ensureFile(filePath, initialValue = '[]') {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, initialValue);
  }
}

export async function readJSON(filePath) {
  await ensureFile(filePath);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data || '[]');
}

export async function writeJSON(filePath, data) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2));
  await fs.rename(tmp, filePath);
}
