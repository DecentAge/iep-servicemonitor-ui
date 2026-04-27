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
    if (typeof window.getEnvConfig === 'function') return window.getEnvConfig(key);
    const v = window.envConfig?.[key];
    return v && v.length > 0 ? v : null;
  }
}
