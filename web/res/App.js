import React from "react"
import {useNearInit} from "./hooks/useNearApi"
import PoolInfo from './components/Poolnfo'
import Header from "./components/Header";

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

	return (
			<div>
				<Header />
				<h1>React is here</h1>
				{
					ctx.poolContract ? <PoolInfo poolContract={ctx.poolContract} poolId={poolId}/>  : <h1>is loading...</h1>
				}
				<button className="mdc-button mdc-button--raised">
					<span className="mdc-button__ripple">Learn More</span>
				</button>
			</div>
	)
}
