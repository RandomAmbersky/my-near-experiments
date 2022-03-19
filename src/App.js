import 'regenerator-runtime/runtime'
import React from 'react'
import './global.css'

import Login from './components/Login'

import useCtx from "./useCtx";

const App = () => {
  console.log('App...')

  const ctx = useCtx()
  console.log('ctx:', ctx)

  return (
    <>
      {ctx.isConnected && <Login isSigned={ctx.isSigned} />}
      {!ctx.isConnected && <h1>notConnected</h1>}
    </>
  )
}

export default App