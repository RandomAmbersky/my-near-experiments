import React from "react"
import {useNearInit} from "./hooks/useNearApi"
import PoolInfo from './components/Poolnfo'

import { Box, ThemeProvider } from '@mui/system'
import {createTheme} from '@mui/material/styles'
import {CssBaseline} from '@mui/material'

const poolId = 474

const initialCtxState = {
	accountId: null,
	poolContract: null,
	walletAccount: null,
	near: null
}

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
		action: {
			active: '#001E3C',
		},
		success: {
			dark: '#009688',
		},
	},
});

export function App () {
	console.log("App...")
	const ctx = useNearInit(initialCtxState)

	return (
		<ThemeProvider theme={theme}>
			<Box>
				<CssBaseline />
				<h1>React is here</h1>
				{
					ctx.poolContract ? <PoolInfo poolContract={ctx.poolContract} poolId={poolId}/>  : <h1>is loading...</h1>
				}
			</Box>
		</ThemeProvider>
	)
}
