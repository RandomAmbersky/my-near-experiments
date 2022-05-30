import React, {useReducer, useEffect} from "react"

import {reducer, doDispatch, initialStorage} from './api/storage'

import nearAPI from './api/near-api'
import poolApi from './api/pool-api'
import ftApi from './api/ft-api'

import PoolInfo from './components/Poolnfo'
import Login from './components/Login'
import UserInfo from "./components/UserInfo";
// import UserInfo from "./components/UserInfo";

export function App () {
	console.log("App...")
	const [ctx, dispatch] = useReducer(reducer, initialStorage);

	/**
	 * @param {Promise} resp
	 * @param {String} action
	 */
	const dispatchAsync = (action, resp) => {
		resp
			.catch(err => doDispatch(dispatch, 'error', err))
			.then(resp => doDispatch(dispatch, action, resp))
	}

	const {
		poolContract,
		poolId,
		accountId
	} = ctx

	useEffect( () => {
		const resp = nearAPI.init()
		dispatchAsync('init', resp)
	}, [])

	useEffect( () => {
		if (!accountId) { return }
		const resp = poolApi.getInfo({poolContract, poolId})
		dispatchAsync('poolInfo', resp)
	}, [accountId])

	const {
		goldContract,
		wNearContract
	} = ctx

	useEffect( () => {
		if (!accountId) { return }
		const respGold = ftApi.getBalance({
			contract: goldContract,
			accountId
		})
		const respWNear = ftApi.getBalance({
			contract: wNearContract,
			accountId
		})
		dispatchAsync('getBalanceGold', respGold)
		dispatchAsync('getBalanceWNear', respWNear)
	}, [accountId])

	const { poolInfo } = ctx

	console.log('Storage:', ctx)

	if (ctx.isLoading) {
		return <h1>Loading...</h1>
	}

	return (
			<div>
				<h1>React is here</h1>
				<Login walletAccount={ctx.walletAccount} accountId={ctx.accountId}/>
				{
					ctx.balanceGold && ctx.balanceWNear ? <UserInfo
						wNearBalance={ctx.balanceWNear}
						elGoldBalance={ctx.balanceGold}
					/> : ''
				}
				<hr />
				{
					poolInfo ? <PoolInfo
						elGOLD={poolInfo.elGOLD}
						wNear={poolInfo.wNear}
						fee={poolInfo.fee}
					/> : ''
				}
				<hr />
			</div>
	)
}
