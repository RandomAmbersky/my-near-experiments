import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from 'react'
import './global.css'

const config = getConfig(process.env.NODE_ENV || 'development')

import {useInitNear} from "./useCtx"
import * as walletApi from "./api/wallet"
import * as contractApi from "./api/contract"

import Login from './components/Login'
import getConfig from "./config";

const App = () => {
  console.log('App...')

  const {
    wallet,
    contract,
    accountId,
    isConnected,
    isSigned
  } = useInitNear()

  const [greetingStr, setGreetingStr] = useState('UNDEFINED')

  console.log('isConnected:', isConnected)
  console.log('isSigned:', isSigned)
  console.log('greetingStr:', greetingStr)
  console.log('accountId:', accountId)

  useEffect( () => {
    console.log('useEffect - accountId: ', accountId)
    if (isConnected && isSigned && contract && accountId) contractApi.getGreeting({contract, accountId})
        .then(resp => {
          setGreetingStr(resp)
        })
        .catch(err => {
          console.log(err)
          setGreetingStr('UNDEFINED ERR')
        })
  }, [accountId])

  const doLogin = async () => {
    return walletApi.loginNear({
      wallet,
      contractName: config.contractName
    })
  }
  const doLogout = () => {
    walletApi.logoutNear({ wallet})
    document.location.reload();
  }

  console.log(greetingStr)

  return (
    <>
      {!isConnected && <h1>notConnected</h1>}
      {isConnected && <Login
        accountId={accountId}
        isSigned={isSigned}
        onClickLogin={doLogin}
        onClickLogout={doLogout}
      />}
      {isSigned && <main>
        <input
          key={greetingStr}
          autoComplete="off"
          defaultValue={greetingStr}
          id="greeting"
        />
      </main>}
    </>
  )
}

export default App
