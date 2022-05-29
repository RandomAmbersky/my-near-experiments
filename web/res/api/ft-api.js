const nearApiJS = require('near-api-js')

/**
 * @param {String} contractName
 * @param {Object} walletAccount
 * @returns {Promise<Object>}
 */
const initContract = async ({contractName, walletAccount}) => {
	return new nearApiJS.Contract(
		walletAccount.account(),
		contractName,
		{
			viewMethods: ["ft_balance_of", "storage_balance_of"],
			changeMethods: [],
			sender: walletAccount.getAccountId()
		}
	)
}

/**
 * @param {Object} contract
 * @param {String} accountId
 * @returns {Promise<{fee: *, elGOLD: *, wNear: *}>}
 */
const getBalance = async ({contract, accountId}) => {
	const rawResp = await contract.ft_balance_of({
		account_id: accountId
	})
	console.log('============= useGetBalance:', contract.contractId, accountId, rawResp)
	return rawResp
}

/**
 * @param {Object} contract
 * @param {String} accountId
 * @returns {Promise<void>}
 */
const getStorageBalance = async ({contract, accountId}) => {
	const rawBalance = await contract.storage_balance_of({
		account_id: accountId
	})
	console.log(rawBalance)
}

module.exports = {
	initContract,
	getBalance,
	getStorageBalance
}
