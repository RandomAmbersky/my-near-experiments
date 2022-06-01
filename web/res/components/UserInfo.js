const Big = require('big.js')
const {OneNear, OneElGOLD} = require('../config')

export default function UserInfo ({wNearBalance, elGoldBalance, addWNear}) {
	console.log('UserInfo...')
	return (
		<div>
			<h3>Balance:</h3>
					wNear: {Big(wNearBalance).div(OneNear).toPrecision()}&nbsp;
				<button onClick={()=>addWNear(1)}>
					<span>add 1 Near</span>
				</button>&nbsp;
				<button onClick={()=>addWNear(10)}>
					<span>add 10 Near</span>
				</button>
			<div>elGold: {Big(elGoldBalance).div(OneElGOLD).toPrecision()}</div>
		</div>
	)
}
