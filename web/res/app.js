const nearAPI = require('./near-api')
const poolAPI = require('./pool-api')

const poolId = 474

let ctx = {}

const start = () => {
	console.log('start...')
	init()
		.then(r => console.log(r))
		.catch(e => console.log(e))
}

start()

async function init () {
	console.log('init')
	ctx = await nearAPI.init()

	const dataPool = await poolAPI.getInfo({
		poolContract: ctx.poolContract,
		poolId
	})

	const { elGOLD, wNear, fee } = dataPool

	console.log('elGOLD: ', elGOLD.toPrecision())
	console.log('wNear: ', wNear.toPrecision())
	console.log('fee:', fee)
	return 'init ok'
}
