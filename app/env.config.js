window.envConfig = {
	AUTO_PAGE_REFRESH_INTERVAL: 30000,
	
	PEER_ENDPOINTS_1: 'http://localhost/peerexplorer-backend/api/nodes',
	PEER_ENDPOINTS_2: 'http://localhost/peerexplorer-backend/api/nodes',
	PEER_ENDPOINTS_3: 'http://localhost/peerexplorer-backend/api/nodes',
	
	MACAP_ENDPOINT: 'http://localhost/mcap-backend/api/v1/get',
	
	APP_ENDPOINTS_PEER: 'http://localhost/peerexplorer/images/iep-logo.png',
	APP_ENDPOINTS_BLOCK: 'http://localhost/blockexplorer/images/iep-logo.png',
	APP_ENDPOINTS_WALLET_1: 'http://localhost/wallet/assets/images/logo.png',
	APP_ENDPOINTS_WALLET_2: 'http://localhost/wallet/assets/images/logo.png',
	APP_ENDPOINTS_WALLET_3: 'http://localhost/wallet/assets/images/logo.png',
	
	WEBSITE_ENDPOINTS: 'http://localhost/backend-api/docs/images/favicon-16x16.png',
	WIKI_ENDPOINTS: 'http://localhost/backend-api/docs/images/favicon-16x16.png',
}

window.getEnvConfig = function(key) {
	var envConfig = window['envConfig'];
	if (envConfig[key]) {
		if (typeof envConfig[key] !== 'string' && envConfig[key].length === 0) {
			return null;
		} else if (typeof envConfig[key] === 'string' && envConfig[key] === '') {
			return null;
		} else {
			return envConfig[key];
		}
	}
	return null;
}
