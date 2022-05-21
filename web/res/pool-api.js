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
			viewMethods: ["get_pool", "get_deposit"],
			changeMethods: [],
			sender: walletAccount.getAccountId()
		}
	)
}

const getDataPool = async ({poolContract, poolId}) => {
	const rawPool = await poolContract.get_pool({
		pool_id: poolId,
	})
	console.log('getDataPool: ')
	console.log(rawPool)
}

module.exports = {
	initContract,
	getDataPool
}
