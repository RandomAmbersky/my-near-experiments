import React, {useEffect} from "react"
import {useNearInit} from "./hooks/useNearApi";

import PoolInfo from './components/Poolnfo'

const poolId = 474

const initialCtxState = {
	accountId: null,
	poolContract: null,
	walletAccount: null,
	near: null
}

export function App () {
	console.log("App...")
	const ctx = useNearInit(initialCtxState)
	// const pool = usePoolInfo(ctx.poolContract, poolId)
	// console.log(pool)

	return (
		<div>
			<h1>React is here</h1>
			<PoolInfo poolContract={ctx.poolContract} poolId={poolId} />
		</div>
	)
}
