import React from "react"
import {usePoolInfo} from "../hooks/usePoolApi"

export default function PoolInfo ({poolContract, poolId}) {
  console.log('Pool info...')
  const { elGOLD, wNear, fee } = usePoolInfo(poolContract, poolId)
	if (!(elGOLD && wNear && fee)) {
    return <h2>Loading...</h2>
  }

  const v = {
    elGOLD: elGOLD.toPrecision(),
    wNear: wNear.toPrecision(),
    OneNear: elGOLD.div(wNear).toPrecision(),
    OneGold: wNear.div(elGOLD).toPrecision()
  }

  return (
    <div>
      <div>Pool have a {v.elGOLD} elGOLD and {v.wNear} wNear with {fee} fee</div>
      <div>1 wNear = {v.OneNear} elGOLD</div>
      <div>1 elGOLD = {v.OneGold} wNear</div>
    </div>
	)
}
