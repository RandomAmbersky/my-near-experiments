import React from 'react'

export default function Login({ isSigned, accountId, onClickLogin, onClickLogout }) {
	return (
		<>
			{isSigned && <button onClick={onClickLogout}>{accountId} Logout</button>}
			{!isSigned && <h1>Please login with <button onClick={onClickLogin}>Near</button></h1>}
		</>
	)
}
