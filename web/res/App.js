import React from "react"
import {useNearInit} from "./hooks/useNearApi"
import PoolInfo from './components/Poolnfo'
import Login from './components/Login'

const poolId = 474

const initialCtxState = {
	accountId: null,
	poolContract: null,
	walletAccount: null,
	near: null,
	isLoading: true
}

export function App () {
	console.log("App...")
	const ctx = useNearInit(initialCtxState)

	if (ctx.isLoading) {
		return <h1>Loading...</h1>
	}

	return (
			<div>
				<h1>React is here</h1>
				<Login walletAccount={ctx.walletAccount}/>
				<hr />
				<PoolInfo poolContract={ctx.poolContract} poolId={poolId}/>
				<hr />
			</div>
	)
}
