const Big = require('big.js')
const {OneNear, OneElGOLD} = require('../config')

export default function UserInfo ({wNearBalance, elGoldBalance}) {
	console.log('UserInfo...')
	return (
		<div>
			<h3>Balance:</h3>
			<div>wNear: {Big(wNearBalance).div(OneNear).toPrecision()}</div>
			<div>elGold: {Big(elGoldBalance).div(OneElGOLD).toPrecision()}</div>
		</div>
	)
}
