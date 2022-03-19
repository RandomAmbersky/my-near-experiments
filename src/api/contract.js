import * as nearAPI from 'near-api-js'

const newContract = ({ account, contractName }) => {
	return new nearAPI.Contract(
		account,
		contractName,
		{
			viewMethods: [
				"get_greeting"
			],
			changeMethods: [
				"set_greeting"
			],
		}
	)

}

const getGreeting = async ({ contract, accountId }) => {
	return contract.get_greeting({ account_id: accountId })
}

const setGreeting = async ({ contract, message }) => {
	contract.set_greeting({ message })
}

module.exports = {
	newContract,
	getGreeting,
	setGreeting
}
