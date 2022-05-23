import {useEffect, useState} from 'react'
import nearAPI from '../api/near-api'

const useAsyncFunction = (func, props, initState = {}) => {
	const [result, setResult] = useState(initState)
	useEffect( async ()=> {
		setResult( func(props) )
	})
	return result
}

/**
 * @returns {accountId: any, poolContract: Object, walletAccount: Object, near: Object}
 */
const useNearInit = (initialState) => {
	const [ctx, setCtx] = useState(initialState)
	useEffect( ()=> {
		nearAPI.init()
			.catch(err => {
				console.error(err)
			})
			.then(resp => {
				setCtx(resp)
			})
	}, [])
	return ctx
}

module.exports = {
	useNearInit,
	useAsyncFunction
}
