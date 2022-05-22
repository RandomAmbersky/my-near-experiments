import React from "react"
import { useNearInit } from "./hooks/useNearApi"

export function App () {
	const ctx = useNearInit()
	console.log("App...", ctx)
	return (
		<h1>React is here</h1>
	)
}
