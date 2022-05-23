const nearApiJS = require('near-api-js')

import poolAPI from './pool-api'

const IsMainnet = false

const TestNearConfig = {
	networkId: "testnet",
	nodeUrl: "https://rpc.testnet.near.org",
	walletUrl: "https://wallet.testnet.near.org",
	helperUrl: 'https://helper.testnet.near.org',
	contractPoolName: 'ref-finance-101.testnet'
}
const MainNearConfig = {
	networkId: "mainnet",
	nodeUrl: "https://rpc.mainnet.near.org",
	walletUrl: "https://wallet.near.org",
	helperUrl: 'https://helper.mainnet.near.org',
	contractPoolName: 'ref-finance-101.testnet'
}

const nearConfig = IsMainnet ? MainNearConfig : TestNearConfig

/**
 * @returns {Promise<{accountId: any, poolContract: Object, walletAccount: Object, near: Object}>}
 */
async function init () {
	const near = await nearApiJS.connect(
		Object.assign(nearConfig, {
			deps: {
				keyStore: new nearApiJS.keyStores.BrowserLocalStorageKeyStore()
			}
		}))
	const walletAccount = new nearApiJS.WalletConnection(near)
	const accountId = walletAccount.getAccountId();

	const poolContract = await poolAPI.initContract({
		nearApiJS,
		contractName: nearConfig.contractPoolName,
		walletAccount
	})

	return {
		near,
		walletAccount,
		accountId,
		poolContract
	}
}

module.exports = {
	init
}
