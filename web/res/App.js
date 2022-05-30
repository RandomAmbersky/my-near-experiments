import React, {useReducer, useEffect} from "react"

import {reducer, doDispatch, initialStorage} from './api/storage'

import nearAPI from './api/near-api'
import poolApi from './api/pool-api'

import PoolInfo from './components/Poolnfo'
import Login from './components/Login'
// import UserInfo from "./components/UserInfo";

export function App () {
	console.log("App...")
	// const storage = useStorage()
	const [ctx, dispatch] = useReducer(reducer, initialStorage);

	const {
		poolContract,
		poolId,
		accountId
	} = ctx

	useEffect( () => {
		nearAPI.init()
			.catch(err => doDispatch(dispatch, 'error', err))
			.then(resp => doDispatch(dispatch, 'init', resp))
	}, [])

	useEffect( () => {
		if (!accountId) { return }
		poolApi.getInfo({poolContract, poolId})
			.catch(err => doDispatch(dispatch, 'error', err))
			.then(resp => doDispatch(dispatch, 'poolInfo', resp))
	}, [accountId])

	// useEffect( () => {
	// 	if (!accountId) { return }
	// 	poolApi.getInfo({poolContract, poolId})
	// 		.catch(err => doDispatch(dispatch, 'error', err))
	// 		.then(resp => doDispatch(dispatch, 'poolInfo', resp))
	// }, [accountId])

	const { poolInfo } = ctx

	console.log('Storage:', ctx)

	if (ctx.isLoading) {
		return <h1>Loading...</h1>
	}

	return (
			<div>
				<h1>React is here</h1>
				<Login walletAccount={ctx.walletAccount} accountId={ctx.accountId}/>
				{/*{*/}
				{/*	ctx.accountId ? <UserInfo*/}
				{/*		wNearContract={ctx.wNearContract}*/}
				{/*		goldContract={ctx.goldContract}*/}
				{/*		accountId={ctx.accountId} /> : ''*/}
				{/*}*/}
				<hr />
				{
					poolInfo ? <PoolInfo
						elGOLD={poolInfo.elGOLD}
						wNear={poolInfo.wNear}
						fee={poolInfo.fee}
					/> : ''
				}
				{/*<PoolInfo poolContract={ctx.poolContract} poolId={poolId}/>*/}
				{/*<hr />*/}
			</div>
	)
}
