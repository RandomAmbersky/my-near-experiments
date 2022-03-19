import getConfig from "./config";
import {useEffect, useState} from "react";
import * as nearAPI from "./api/near";

const config = getConfig(process.env.NODE_ENV || 'development')

const useInitNear = () => {
	const [ctx, setCtx] = useState({
		wallet: undefined,
		contract: undefined,
		accountId: undefined,
		isConnected: false,
		isSigned: false
	})

	useEffect(() => {
		console.log('useEffect - useInitNear')
		nearAPI.initContext(config)
			.then(ctx => setCtx(ctx))
			.catch(error => {
				console.log(error)
			})
	}, [])

	return ctx
}

module.exports = {
	useInitNear
}
