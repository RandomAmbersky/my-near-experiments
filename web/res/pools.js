/**
 * @param {Object} nearApi
 * @param {String} contractName
 * @param {Object} walletAccount
 * @returns {Promise<nearApi.Contract>}
 */
const initContract = async ({nearApi, contractName, walletAccount,}) => {
	return new nearApi.Contract(
		walletAccount.account(),
		contractName,
		{
			viewMethods: [
				'nft_tokens_for_owner'
			],
			changeMethods: [
				// 'nft_mint'
			],
			sender: walletAccount.getAccountId()
		}
	)
}

const getDataPool = async () => {
	console.log('getDataPool')
}

module.exports = {
	initContract,
	getDataPool
}
