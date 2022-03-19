
const logoutNear = ({ wallet }) => {
	return wallet.signOut()
}

const loginNear = async ({ wallet, contractName }) => {
	// Allow the current app to make calls to the specified contract on the
	// user's behalf.
	// This works by creating a new access key for the user's account and storing
	// the private key in localStorage.
	return wallet.requestSignIn(contractName)
}

/**
 * @param walletConnection
 * @returns {Promise<Boolean>}
 */
const isLoginNear = async ({ wallet }) => {
	return wallet.isSignedIn()
}

module.exports = {
	loginNear,
	logoutNear,
	isLoginNear
}
