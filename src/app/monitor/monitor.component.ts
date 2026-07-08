import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
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
  status: Record<string, ProbeStatus> = {};
  checking: Record<string, boolean> = {};

  releaseVersion: string;
  networkEnvironment: string;
  
  envLinks: { label: string, url: string }[] = [];

  private refreshTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private monitor: MonitorService,
    private env: EnvConfigService,
    private cdr: ChangeDetectorRef
  ) {
    const ep = buildEndpoints((k) => this.env.get(k));
    this.peers = ep.peers;
    this.apps = ep.apps;
    this.websites = ep.websites;
    this.releaseVersion = this.env.get('RELEASE_VERSION') || '';
    this.networkEnvironment = this.env.get('NETWORK_ENVIRONMENT') || 'mainnet';

    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const mainnet = this.env.get('MAINNET_LINK') || 'https://apps.infinity-economics.io/servicemonitor';
    const testnet = this.env.get('TESTNET_LINK') || 'https://testnet.infinity-economics.io/servicemonitor';
    const devnet = this.env.get('DEVNET_LINK') || `${origin}/servicemonitor`;

    this.envLinks = [
      { label: 'Mainnet', url: mainnet },
      { label: 'Testnet', url: testnet },
      { label: 'Devnet', url: devnet }
    ];
  }

  async ngOnInit(): Promise<void> {
    await this.checkAll();
    const intervalMs = Number(this.env.get('AUTO_PAGE_REFRESH_INTERVAL')) || 300_000;
    this.refreshTimer = setInterval(() => this.checkAll(), intervalMs);
  }

  // Node liveness comes from the peerexplorer backend crawl (`active`); the raw
  // node ports aren't reachable from the browser (mixed content / no TLS).
  async refreshPeers(): Promise<void> {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const peerUrl = this.env.get('PEER_ENDPOINTS_1') || `${origin}/peerexplorer-backend/api/nodes`;
    const nodes = await this.monitor.fetchNodes(peerUrl);
    if (Array.isArray(nodes) && nodes.length > 0) {
      const now = new Date().toString();
      const status = { ...this.status };
      this.peers = nodes.map((node: any, index: number) => {
        let host = node.announcedAddress || node._id || node.ip || 'unknown';
        if (host.includes(':')) {
          host = host.split(':')[0];
        }
        const url = `http://${host}`;
        const label = host !== 'unknown' ? host : `Peer #${index + 1}`;
        status[url] = { online: node.active === true, timestamp: now };
        return { label, ip: host, url, asImage: false, isPeer: true };
      });
      this.status = status;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) clearInterval(this.refreshTimer);
  }

  async checkAll(): Promise<void> {
    await this.refreshPeers();
    [...this.apps, ...this.websites].forEach((ep) => this.check(ep));
  }

  async check(endpoint: MonitorEndpoint): Promise<void> {
    this.checking[endpoint.url] = true;
    this.cdr.detectChanges();
    try {
      if (endpoint.isPeer) {
        await this.refreshPeers();
      } else {
        const online = await this.monitor.probe(endpoint);
        this.status = {
          ...this.status,
          [endpoint.url]: { online, timestamp: new Date().toString() }
        };
      }
    } catch (e) {
      console.error('Check failed', e);
    } finally {
      this.checking[endpoint.url] = false;
      this.cdr.detectChanges();
    }
  }

  statusOf(endpoint: MonitorEndpoint): ProbeStatus | undefined {
    return this.status[endpoint.url];
  }
}
