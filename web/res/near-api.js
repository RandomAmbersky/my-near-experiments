import poolAPI from './pools'

const IsMainnet = false

const TestNearConfig = {
	networkId: "testnet",
	nodeUrl: "https://rpc.testnet.near.org",
	walletUrl: "https://wallet.testnet.near.org",
	helperUrl: 'https://helper.testnet.near.org',
	contractPoolName: 'ref-finance-101.testnet'
};
const MainNearConfig = {
	networkId: "mainnet",
	nodeUrl: "https://rpc.mainnet.near.org",
	walletUrl: "https://wallet.near.org",
	helperUrl: 'https://helper.mainnet.near.org',
	contractPoolName: 'ref-finance-101.testnet'
};

const config = {
	appName: IsMainnet ? "elGOLD bank" : "elGOLD bank",
	nearConfig: IsMainnet ? MainNearConfig : TestNearConfig
}

async function init (nearApi) {
	const near = await nearApi.connect(
		Object.assign(config.nearConfig, {
			deps: {
				keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore()
			}
		}));
	const walletAccount = new nearApi.WalletConnection(near);
	const accountId = walletAccount.getAccountId();
	// const contract = await new nearApi.Contract(walletAccount.account(), nearConfig.contractName, {viewMethods:['nft_tokens_for_owner'], changeMethods:['nft_mint'], sender: window.walletAccount.getAccountId()});

	const poolContract = poolAPI.initContract({
		nearApi,
		contractName: config.nearConfig.contractPoolName,
		walletAccount
	})

	return {
		nearApi,
		near,
		walletAccount,
		accountId,
		poolContract
	}
}

module.exports = {
	init
}
