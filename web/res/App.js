import React from "react"
import {useNearInit} from "./hooks/useNearApi"

import PoolInfo from './components/Poolnfo'
import Login from './components/Login'
import UserInfo from "./components/UserInfo";

const poolId = 474

const initialCtxState = {
	poolContract: null,
	goldContract: null,
	wNearContract: null,
	near: null,
	isLoading: true,
	accountId: null,
	walletAccount: null
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
				<Login walletAccount={ctx.walletAccount} accountId={ctx.accountId}/>
				{
					ctx.accountId ? <UserInfo
						wNearContract={ctx.wNearContract}
						goldContract={ctx.goldContract}
						accountId={ctx.accountId} /> : ''
				}
				<hr />
				<PoolInfo poolContract={ctx.poolContract} poolId={poolId}/>
				<hr />
			</div>
	)
}
