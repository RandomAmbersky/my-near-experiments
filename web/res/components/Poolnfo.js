import React from "react"

export default function PoolInfo ({elGOLD, wNear, fee}) {
  console.log('Pool info...')

  const v = {
    elGOLD: elGOLD.toPrecision(),
    wNear: wNear.toPrecision(),
    OneNear: elGOLD.div(wNear).toPrecision(),
    OneGold: wNear.div(elGOLD).toPrecision()
  }

  return (
    <div>
      <h3>Pool:</h3>
      <div>Pool have a {v.elGOLD} elGOLD and {v.wNear} wNear with {fee} fee</div>
      <div>1 wNear = {v.OneNear} elGOLD</div>
      <div>1 elGOLD = {v.OneGold} wNear</div>
    </div>
	)
}
