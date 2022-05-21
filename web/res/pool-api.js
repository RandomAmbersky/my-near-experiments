const OneNear = Big(10).pow(24);
const OneElGOLD = Big(10).pow(18);


/**
 * @param {Object} nearApi
 * @param {String} contractName
 * @param {Object} walletAccount
 * @returns {Promise<Object>}
 */
const initContract = async ({nearApi, contractName, walletAccount}) => {
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

/**
 * @param {Object} poolContract
 * @param {Number} poolId
 * @returns {Promise<{fee: *, elGOLD: *, wNear: *}>}
 */
const getInfo = async ({poolContract, poolId}) => {
	const rawPool = await poolContract.get_pool({
		pool_id: poolId,
	})
	console.log(rawPool)
	const elGOLD = Big(rawPool.amounts[0]).div(OneElGOLD)
	const wNear = Big(rawPool.amounts[1]).div(OneNear)
	const fee = rawPool.total_fee;
	return { elGOLD, wNear, fee }
}

module.exports = {
	initContract,
	getInfo
}
