const nearApiJS = require('near-api-js')

import poolAPI from './pool-api'
import ftAPI from './ft-api'

const IsMainnet = false

const TestNearConfig = {
	networkId: "testnet",
	nodeUrl: "https://rpc.testnet.near.org",
	walletUrl: "https://wallet.testnet.near.org",
	helperUrl: 'https://helper.testnet.near.org',
	contractPoolName: 'ref-finance-101.testnet',
	contractGoldName: 'dev-1652538142137-68539457665982',
	contractWNearName: 'wrap.testnet'
}

const MainNearConfig = {
	networkId: "mainnet",
	nodeUrl: "https://rpc.mainnet.near.org",
	walletUrl: "https://wallet.near.org",
	helperUrl: 'https://helper.mainnet.near.org',
	contractPoolName: 'ref-finance-101.testnet',
	contractGoldName: 'dev-1652538142137-68539457665982',
	contractWNearName: 'wrap.testnet'
}

const nearConfig = IsMainnet ? MainNearConfig : TestNearConfig

/**
 * @returns {Promise<
 * {accountId: any,
 * poolContract: Object,
 * walletAccount: Object,
 * goldContract: Object,
 * near: Object}
 * >}
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

	const goldContract = await ftAPI.initContract({
		nearApiJS,
		contractName: nearConfig.contractGoldName,
		walletAccount
	})

	const wNearContract = await ftAPI.initContract({
		nearApiJS,
		contractName: nearConfig.contractWNearName,
		walletAccount
	})

	return {
		poolContract,
		goldContract,
		wNearContract,
		near,
		isLoading: false,
		walletAccount,
		accountId,
	}
}

/**
 * @param {Object} walletAccount
 * @returns {Promise<void>}
 */
async function login({walletAccount}) {
	return walletAccount.requestSignIn()
}

/**
 * @param {Object} wallet
 * @returns {Promise<void>}
 */
async function logout({walletAccount}) {
	await walletAccount.signOut();
	window.location.replace(window.location.origin + window.location.pathname);
}

module.exports = {
	init,
	login,
	logout
}
