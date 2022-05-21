const nearAPI = require('./near-api')
const poolAPI = require('./pool-api')

const poolId = 474

window.ctx = {}

window.start = (nearApi) => {
	console.log('start...')
	init(nearApi)
		.then(r => console.log(r))
		.catch(e => console.log(e))
}

async function init (nearApi) {
	console.log('init')
	window.ctx = await nearAPI.init(nearApi)

	const dataPool = await poolAPI.getDataPool({
		poolContract: window.ctx.poolContract,
		poolId
	}, )

	return 'init ok'
}

// window.near = await nearApi.connect(Object.assign(nearConfig, { deps: { keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore() }}));
// window.walletAccount = new nearApi.WalletConnection(window.near);
// window.accountId = walletAccount.getAccountId();
// window.contract = await new nearApi.Contract(walletAccount.account(), nearConfig.contractName, {viewMethods:['nft_tokens_for_owner'], changeMethods:['nft_mint'], sender: window.walletAccount.getAccountId()});
