const poolId = 474

const IsMainnet = false

const TestNearConfig = {
	networkId: "testnet",
	nodeUrl: "https://rpc.testnet.near.org",
	walletUrl: "https://wallet.testnet.near.org",
	helperUrl: 'https://helper.testnet.near.org',
	contractPoolName: 'ref-finance-101.testnet',
	contractGoldName: 'dev-1652538142137-68539457665982',
	contractWNearName: 'wrap.testnet'
}

const MainNearConfig = {
	networkId: "mainnet",
	nodeUrl: "https://rpc.mainnet.near.org",
	walletUrl: "https://wallet.near.org",
	helperUrl: 'https://helper.mainnet.near.org',
	contractPoolName: 'ref-finance-101.testnet',
	contractGoldName: 'dev-1652538142137-68539457665982',
	contractWNearName: 'wrap.testnet'
}

const nearConfig = IsMainnet ? MainNearConfig : TestNearConfig

export const initialStorage = {
	nearConfig,
	poolId,
	poolContract: null,
	goldContract: null,
	wNearContract: null,
	near: null,
	isLoading: true,
	accountId: null,
	walletAccount: null
}

const init = (state, payload) => {
	return { ...state, ...payload }
}

const error = (state, payload) => {
	console.log('Error! ', payload)
	return state
}

const poolInfo = (state, payload) => {
	return { ...state, poolInfo: payload }
}

const ACTION = {
	init,
	error,
	poolInfo
}

export const reducer = (state, action) => {
	console.log('reducer:', action.type, action.payload)
	const fn = ACTION[action.type]
	if (!fn) {
		const mess = action.type + 'not found!'
		throw new Error(mess)
	}
	return fn(state, action.payload)
}

export const doDispatch = (dispatch, action, payload) => {
	dispatch({
		type: action,
		payload
	})
}
