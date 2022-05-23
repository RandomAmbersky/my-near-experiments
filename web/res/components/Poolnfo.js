import React from "react"
import {usePoolInfo} from "../hooks/usePoolApi"

export default function PoolInfo ({poolContract, poolId}) {
	const info = usePoolInfo(poolContract, poolId)
	console.log('Pool info: ', info)
	return (
		<h2>Pool data:</h2>
	)
}
