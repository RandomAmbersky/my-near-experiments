import {useEffect, useState} from 'react'
import poolAPI from '../api/pool-api'

const usePoolInfo = (poolContract, poolId) => {
	const [rawPoolInfo, setRawPoolInfo] = useState({})
	useEffect( ()=> {
		poolAPI.getInfo({
			poolContract, poolId
		})
			.catch(err => {
				console.error(err)
			})
			.then(resp => {
				setRawPoolInfo(resp)
			})
	}, [poolContract, poolId])
	return rawPoolInfo
}

module.exports = {
	usePoolInfo
}
