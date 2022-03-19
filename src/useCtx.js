import * as nearApi from "./api/near";
import * as contractApi from "./api/contract";
import getConfig from "./config";
import {useEffect, useState} from "react";

const config = getConfig(process.env.NODE_ENV || 'development')

/**
 * @returns {Promise<{
 * accountId: String,
 * isSigned: boolean,
 * contract: Object,
 * isConnected: boolean
 * }>}
 */
const initContext = async () => {
	const resp = await nearApi.initNear(config)
	const isSigned = await nearApi.isLoginNear({
		walletConnection: resp.walletConnection
	})
	const contract = await contractApi.newContract({
		account: resp.account,
		contractName: config.contractName
	})
	const respGreeting = await contractApi.getGreeting({
		contract,
		accountId: resp.accountId
	})
	console.log('respGreeting:', respGreeting)
	return {
		accountId: resp.accountId,
		contract,
		isSigned,
		isConnected: true
	}
}

const useCtx = () => {
	console.log('useCtx...')
	const [ctx, setCtx] = useState({})

	useEffect(() => {
		initContext()
			.then(ctx => setCtx(ctx))
			.catch(error => {
				console.log(error)
			})
	}, [])

	return ctx
}

export default useCtx
