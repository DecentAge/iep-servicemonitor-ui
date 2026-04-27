export interface MonitorEndpoint {
  label: string;
  ip: string;
  url: string;
  /** true => probe with an Image() load (no CORS), false => HTTP GET */
  asImage: boolean;
}

const safeHost = (url: string | null | undefined): string => {
  if (!url) return '';
  try {
    return new URL(url).host;
  } catch {
    return '';
  }
};

export function buildEndpoints(env: (key: string) => string | null): {
  peers: MonitorEndpoint[];
  apps: MonitorEndpoint[];
  websites: MonitorEndpoint[];
} {
  const peer = env('PEER_ENDPOINTS_1') || 'http://35.204.224.241:8888/api/nodes';
  const appPeer = env('APP_ENDPOINTS_PEER') || 'http://35.204.224.241/peerexplorer/images/logo_nav.png';
  const appBlock = env('APP_ENDPOINTS_BLOCK') || 'http://35.204.224.241/peerexplorer/images/logo_nav.png';
  const wallet1 = env('APP_ENDPOINTS_WALLET_1') || 'http://35.242.201.209/assets/images/logo.png';
  const wallet2 = env('APP_ENDPOINTS_WALLET_2') || 'http://35.242.201.209/assets/images/logo.png';
  const wallet3 = env('APP_ENDPOINTS_WALLET_3') || 'http://35.242.201.209/assets/images/logo.png';
  const website = env('WEBSITE_ENDPOINTS') || 'http://199.127.137.169:9005/docs/images/favicon-16x16.png';
  const wiki = env('WIKI_ENDPOINTS') || 'http://199.127.137.169:9006/docs/images/favicon-16x16.png';

  return {
    peers: [{ label: 'Main Node', ip: safeHost(peer), url: peer, asImage: false }],
    apps: [
      { label: 'Peerexplorer', ip: safeHost(appPeer), url: appPeer, asImage: true },
      { label: 'Blockexplorer', ip: safeHost(appBlock), url: appBlock, asImage: true },
      { label: 'Online Wallet #1', ip: safeHost(wallet1), url: wallet1, asImage: true },
      { label: 'Online Wallet #2', ip: safeHost(wallet2), url: wallet2, asImage: true },
      { label: 'Online Wallet #3', ip: safeHost(wallet3), url: wallet3, asImage: true },
    ],
    websites: [
      { label: 'Website', ip: safeHost(website), url: website, asImage: true },
      { label: 'Wiki', ip: safeHost(wiki), url: wiki, asImage: true },
    ],
  };
}
