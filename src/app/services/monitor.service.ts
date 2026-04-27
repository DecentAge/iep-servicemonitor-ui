import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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
      });
    }
    try {
      await firstValueFrom(this.http.get(endpoint.url, { responseType: 'text' }));
      return true;
    } catch {
      return false;
    }
  }
}
