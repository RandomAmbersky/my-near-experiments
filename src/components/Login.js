import React from 'react'

export default function Login({ isSigned }) {
	return (
		<>
			{isSigned && <h1>Ok</h1>}
			{!isSigned && <h1>Please connect with Near</h1>}
		</>
	)
}
