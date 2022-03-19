import * as nearApi from "./api/near";
import * as contractApi from "./api/contract";
import getConfig from "./config";
import {useEffect, useState} from "react";
import * as nearAPI from "near-api-js";
import walletApi from "./api/wallet";

const config = getConfig(process.env.NODE_ENV || 'development')

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
	)

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

	// call contract
	// const respGreeting = await contractApi.getGreeting({
	// 	contract,
	// 	accountId: resp.accountId
	// })
	// console.log('respGreeting:', respGreeting)

	return {
		wallet: walletConnection,
		contract,
		accountId,
		isConnected: true,
		isSigned
	}
}

const useInitNear = () => {
	console.log('useInitNear...')
	const [ctx, setCtx] = useState({
		contract: undefined,
		wallet: undefined,
		isConnected: false,
		isSigned: false
	})

	useEffect(() => {
		initContext(config)
			.then(ctx => setCtx(ctx))
			.catch(error => {
				console.log(error)
			})
	}, [])

	return ctx
}

export default useInitNear
