import * as nearAPI from "near-api-js";

const initNear = async (nearConfig) => {

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

	// const accountId = walletConnection.getAccountId()
	// const account = walletConnection.account()

	return {
		keyStore,
		near,
		walletConnection,
		// accountId,
		// account
	}
}

module.exports = {
	initNear
}
