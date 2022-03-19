import React from 'react'

export default function Login({ isSigned, onClickLogin, onClickLogout }) {
	return (
		<>
			{isSigned && <button onClick={onClickLogout}>Logout</button>}
			{!isSigned && <h1>Please login with <button onClick={onClickLogin}>Near</button></h1>}
		</>
	)
}
