const Big = require('big.js')
const OneNear = Big(10).pow(24);
const OneElGOLD = Big(10).pow(18);

import {useGetBalance} from "../hooks/useFTApi";

export default function UserInfo ({wNearContract, goldContract, accountId}) {
	console.log('UserInfo...')
	const wNearBalance = useGetBalance({
		contract: wNearContract,
		accountId
	})
	const elGoldBalance = useGetBalance({
		contract: goldContract,
		accountId
	})

	console.log(wNearBalance, elGoldBalance)
	return (
		<div>
			<h3>Balance:</h3>
			<div>wNear: {Big(wNearBalance).div(OneNear).toPrecision()}</div>
			<div>elGold: {Big(elGoldBalance).div(OneElGOLD).toPrecision()}</div>
		</div>
	)
}
