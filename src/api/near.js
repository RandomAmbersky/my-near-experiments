import * as nearAPI from "near-api-js";

const initNear = async (nearConfig) => {

	const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore()
	const near = await nearAPI.connect(
		Object.assign({ deps: { keyStore } }, nearConfig)
	)
	const walletConnection = new nearAPI.WalletConnection(
		near,
		nearConfig.contractName
	);
	const accountId = walletConnection.getAccountId()
	const account = walletConnection.account()

	return {
		keyStore,
		near,
		walletConnection,
		accountId,
		account
	}
}

const logoutNear = ({ walletConnection }) => {
	return walletConnection.signOut()
}

const loginNear = async ({ walletConnection, contractName }) => {
	// Allow the current app to make calls to the specified contract on the
	// user's behalf.
	// This works by creating a new access key for the user's account and storing
	// the private key in localStorage.
	return walletConnection.requestSignIn(contractName)
}

/**
 * @param walletConnection
 * @returns {Promise<Boolean>}
 */
const isLoginNear = async ({ walletConnection }) => {
	return walletConnection.isSignedIn()
}

module.exports = {
	initNear,
	loginNear,
	logoutNear,
	isLoginNear
}
