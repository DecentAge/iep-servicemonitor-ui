import { Injectable } from '@angular/core';

declare global {
  interface Window {
    envConfig?: Record<string, string>;
    getEnvConfig?: (key: string) => string | null;
  }
}

@Injectable({ providedIn: 'root' })
export class EnvConfigService {
  get(key: string): string | null {
    if (typeof window === 'undefined') return null;
    const raw =
      typeof window.getEnvConfig === 'function'
        ? window.getEnvConfig(key)
        : window.envConfig?.[key];
    if (raw === null || raw === undefined) return null;
    const v = String(raw);
    if (v.length === 0 || v.startsWith('${')) return null;
    return v;
  }
}
