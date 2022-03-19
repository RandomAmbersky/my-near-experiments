import * as nearAPI from "near-api-js";
import * as contractApi from "./contract";
import walletApi from "./wallet";

/**
 * @returns {Promise<{
 * contract: Object,
 * wallet: Object,
 * isConnected: boolean,
 * isSigned: boolean
 * }>}
 */
const initContext = async (nearConfig) => {

	const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
	const near = await nearAPI.connect(
		Object.assign({
			deps: { keyStore }
		}, nearConfig)
	)
	const walletConnection = new nearAPI.WalletConnection(
		near,
		nearConfig.contractName
	);

	// account
	const account = walletConnection.account()
	const accountId = walletConnection.getAccountId()

	// contract
	const contract = await contractApi.newContract({
		account,
		contractName: nearConfig.contractName
	})

	// wallet
	const isSigned = await walletApi.isLoginNear({
		wallet: walletConnection
	})

	return {
		wallet: walletConnection,
		contract,
		accountId,
		isConnected: true,
		isSigned
	}
}

module.exports = {
	initContext
}
