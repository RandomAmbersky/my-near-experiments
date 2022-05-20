const IsMainnet = false

const TestNearConfig = {
	networkId: "testnet",
	nodeUrl: "https://rpc.testnet.near.org",
	walletUrl: "https://wallet.testnet.near.org",
	helperUrl: 'https://helper.testnet.near.org'
};
const MainNearConfig = {
	networkId: "mainnet",
	nodeUrl: "https://rpc.mainnet.near.org",
	walletUrl: "https://wallet.near.org",
	helperUrl: 'https://helper.mainnet.near.org'
};

const config = {
	appName: IsMainnet ? "elGOLD bank" : "elGOLD bank",
	nearConfig: IsMainnet ? MainNearConfig : TestNearConfig
}

async function start () {

}

start()
.then( resp => {
	console.log('Ok')
})
.catch( err => {
	console.log(err)
})
