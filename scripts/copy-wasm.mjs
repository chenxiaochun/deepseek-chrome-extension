import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'node_modules/deepseek-driver/dist/sha3_wasm_bg.wasm');
const targetDir = join(root, 'public');
const target = join(targetDir, 'sha3_wasm_bg.wasm');

if (!existsSync(source)) {
  console.warn('[copy-wasm] deepseek-driver wasm not found, skip');
  process.exit(0);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);
console.log('[copy-wasm] copied sha3_wasm_bg.wasm to public/');
