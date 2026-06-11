import { DeepSeekDriver } from 'deepseek-driver';

let clientPromise: Promise<DeepSeekDriver> | null = null;

export async function createDeepSeekClient(): Promise<DeepSeekDriver> {
  if (!clientPromise) {
    clientPromise = Promise.resolve(
      new DeepSeekDriver({
        wasmUrl: chrome.runtime.getURL('sha3_wasm_bg.wasm'),
        skipApiDiscover: true,
      }),
    );
  }
  return clientPromise;
}

export function resetDeepSeekClient() {
  clientPromise = null;
}
