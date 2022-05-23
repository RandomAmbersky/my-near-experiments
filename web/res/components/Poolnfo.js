import React from "react"
import {usePoolInfo} from "../hooks/usePoolApi"

export default function PoolInfo ({poolContract, poolId}) {
  console.log('Pool info...')
  const { elGOLD, wNear, fee } = usePoolInfo(poolContract, poolId)
	if (!(elGOLD && wNear && fee)) {
    return <h2>Loading...</h2>
  }

  return (
		<h2>Pool: {elGOLD.toPrecision()} elGOLD : {wNear.toPrecision()} (fee: {fee})</h2>
	)
}
