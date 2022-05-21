const nearAPI = require('./near-api')
const poolAPI = require('./pool-api')

const poolId = 474

window.ctx = {}

window.start = (nearApi) => {
	console.log('start...')
	init(nearApi)
		.then(r => console.log(r))
		.catch(e => console.log(e))
}

async function init (nearApi) {
	console.log('init')
	window.ctx = await nearAPI.init(nearApi)

	const dataPool = await poolAPI.getInfo({
		poolContract: window.ctx.poolContract,
		poolId
	})

	const { elGOLD, wNear, fee } = dataPool

	console.log('elGOLD: ', elGOLD.toPrecision())
	console.log('wNear: ', wNear.toPrecision())
	console.log('fee:', fee)
	return 'init ok'
}
