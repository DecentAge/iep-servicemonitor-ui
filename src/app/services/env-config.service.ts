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
    if (typeof window.getEnvConfig === 'function') {
      const v = window.getEnvConfig(key);
      if (v && v.startsWith('${')) return null;
      return v;
    }
    const v = window.envConfig?.[key];
    if (v && (v.length === 0 || v.startsWith('${'))) return null;
    return v || null;
  }
}
