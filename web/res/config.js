const Big = require('big.js')
const OneNearPow = 24
const	OneElGOLDPow = 18

const OneNear = Big(10).pow(OneNearPow)
const OneElGOLD = Big(10).pow(OneElGOLDPow)

module.exports = {
	OneNearPow: 24,
	OneElGOLDPow: 18,
	OneNear,
	OneElGOLD
}
