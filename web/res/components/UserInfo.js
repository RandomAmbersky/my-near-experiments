const Big = require('big.js')
const {OneNear, OneElGOLD} = require('../config')

const addWNear = async () => {
	console.log('addWNear')
}

export default function UserInfo ({wNearBalance, elGoldBalance}) {
	console.log('UserInfo...')
	return (
		<div>
			<h3>Balance:</h3>
					wNear: {Big(wNearBalance).div(OneNear).toPrecision()}&nbsp;
				<button onClick={addWNear}>
					<span>add wNear</span>
				</button>
			<div>elGold: {Big(elGoldBalance).div(OneElGOLD).toPrecision()}</div>
		</div>
	)
}
