import {useEffect, useState} from 'react'
import ftAPI from '../api/ft-api'

/**
 * @param {Object} contract
 * @param {String} accountId
 * @returns {{}}
 */
const useGetBalance = ({contract, accountId}) => {
	const [rawBalance, setBalance] = useState(0)
	useEffect( ()=> {
		if (!contract) {
			setBalance(0)
		} else if (!accountId) {
			setBalance(0)
		} else
			ftAPI.getBalance({
			contract, accountId
		})
			.catch(err => {
				console.error(err)
			})
			.then(resp => {
				setBalance(resp)
			})
	}, [contract, accountId])
	return rawBalance
}

module.exports = {
	useGetBalance
}
