import { Component, OnDestroy, OnInit } from '@angular/core';
import { MonitorService } from '../services/monitor.service';
import { EnvConfigService } from '../services/env-config.service';
import { MonitorEndpoint, buildEndpoints } from './monitor-config';

interface ProbeStatus {
  online: boolean;
  timestamp: string;
}

@Component({
  selector: 'app-monitor',
  standalone: false,
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit, OnDestroy {
  peers: MonitorEndpoint[] = [];
  apps: MonitorEndpoint[] = [];
  websites: MonitorEndpoint[] = [];
  status = new Map<string, ProbeStatus>();

  releaseVersion: string;
  networkEnvironment: string;

  private refreshTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private monitor: MonitorService,
    private env: EnvConfigService
  ) {
    const ep = buildEndpoints((k) => this.env.get(k));
    this.peers = ep.peers;
    this.apps = ep.apps;
    this.websites = ep.websites;
    this.releaseVersion = this.env.get('RELEASE_VERSION') || '';
    this.networkEnvironment = this.env.get('NETWORK_ENVIRONMENT') || 'mainnet';
  }

  ngOnInit(): void {
    this.checkAll();
    const intervalMs = Number(this.env.get('AUTO_PAGE_REFRESH_INTERVAL')) || 300_000;
    this.refreshTimer = setInterval(() => this.checkAll(), intervalMs);
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }

  checkAll(): void {
    [...this.peers, ...this.apps, ...this.websites].forEach((ep) => this.check(ep));
  }

  async check(endpoint: MonitorEndpoint): Promise<void> {
    const online = await this.monitor.probe(endpoint);
    this.status.set(endpoint.url, { online, timestamp: new Date().toString() });
  }

  statusOf(endpoint: MonitorEndpoint): ProbeStatus | undefined {
    return this.status.get(endpoint.url);
  }
}
