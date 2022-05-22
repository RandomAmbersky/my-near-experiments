import {useEffect, useState} from 'react'
import nearAPI from '../api/near-api'

const useNearInit = () => {
	const [ctx, setCtx] = useState({})
	useEffect( ()=> {
		nearAPI.init()
			.catch(err => {
				console.error(err)
			})
			.then(resp => {
				setCtx(resp)
			})
	}, [])
	return ctx
}

module.exports = {
	useNearInit
}
