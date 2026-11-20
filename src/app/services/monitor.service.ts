import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { MonitorEndpoint } from '../monitor/monitor-config';

@Injectable({ providedIn: 'root' })
export class MonitorService {
  constructor(private http: HttpClient) {}

  async probe(endpoint: MonitorEndpoint): Promise<boolean> {
    if (endpoint.asImage) {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = endpoint.url;
        setTimeout(() => resolve(false), 5000);
      });
    }

    try {
      // Use fetch with no-cors to bypass CORS restrictions for liveness check
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // no-cors responses are opaque (an HTTP 404/502 still resolves), so only
      // same-origin endpoints can be checked for a real HTTP status
      const sameOrigin = new URL(endpoint.url, window.location.href).origin === window.location.origin;
      const res = await fetch(endpoint.url, {
        mode: sameOrigin ? 'same-origin' : 'no-cors',
        cache: 'no-cache',
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return sameOrigin ? res.ok : true;
    } catch (e) {
      return false;
    }
  }

  async fetchNodes(url: string): Promise<any[]> {
    try {
      return await firstValueFrom(this.http.get<any[]>(url));
    } catch (e) {
      console.error('Failed to fetch nodes from', url, e);
      return [];
    }
  }
}
