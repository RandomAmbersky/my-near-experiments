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
			viewMethods: ["storage_balance_of", "ft_balance_of"],
			changeMethods: ["storage_deposit", "near_deposit", "ft_transfer_call"]
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
	console.log('useGetBalance:', contract.contractId, accountId, rawResp)
	return rawResp
}

/**
 * @param {Object} contract
 * @param {String} accountId
 * @returns {Promise<void>}
 */
const getStorageBalance = async ({contract, accountId}) => {
	const rawStorageBalance = await contract.storage_balance_of({
		account_id: accountId
	})
	console.log(rawStorageBalance)
}

module.exports = {
	initContract,
	getBalance,
	getStorageBalance
}