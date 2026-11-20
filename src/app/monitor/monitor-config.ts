export interface MonitorEndpoint {
  label: string;
  ip: string;
  url: string;
  asImage: boolean;
  isPeer?: boolean;
}

const isImage = (url: string) => /\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(url);

export function buildEndpoints(env: (key: string) => string | null): {
  peers: MonitorEndpoint[];
  apps: MonitorEndpoint[];
  websites: MonitorEndpoint[];
} {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
  const host = typeof window !== 'undefined' ? window.location.host : 'localhost';

  const peer = env('PEER_ENDPOINTS_1') || `${origin}/peerexplorer-backend/api/nodes`;
  
  const apps: MonitorEndpoint[] = [];
  
  const appPeer = env('APP_ENDPOINTS_PEER') || `${origin}/peerexplorer`;
  apps.push({ label: 'Peerexplorer', ip: appPeer, url: appPeer, asImage: isImage(appPeer) });

  const appBlock = env('APP_ENDPOINTS_BLOCK') || `${origin}/blockexplorer`;
  apps.push({ label: 'Blockexplorer', ip: appBlock, url: appBlock, asImage: isImage(appBlock) });

  const wallet1 = env('APP_ENDPOINTS_WALLET_1') || `${origin}/wallet`;
  apps.push({ label: 'Online Wallet #1', ip: wallet1, url: wallet1, asImage: isImage(wallet1) });

  const wallet2 = env('APP_ENDPOINTS_WALLET_2');
  if (wallet2) {
    apps.push({ label: 'Online Wallet #2', ip: wallet2, url: wallet2, asImage: isImage(wallet2) });
  }

  const wallet3 = env('APP_ENDPOINTS_WALLET_3');
  if (wallet3) {
    apps.push({ label: 'Online Wallet #3', ip: wallet3, url: wallet3, asImage: isImage(wallet3) });
  }

  const website = env('WEBSITE_ENDPOINTS') || 'https://infinity-economics.io';
  const wiki = env('WIKI_ENDPOINTS') || 'https://wiki.infinity-economics.io';

  return {
    peers: [{ label: 'Main Node', ip: peer, url: peer, asImage: false }],
    apps,
    websites: [
      { label: 'Website', ip: website, url: website, asImage: false },
      { label: 'Wiki', ip: wiki, url: wiki, asImage: false },
    ],
  };
}
