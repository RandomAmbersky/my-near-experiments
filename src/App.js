import 'regenerator-runtime/runtime'
import React, {useState} from 'react'
import './global.css'

const config = getConfig(process.env.NODE_ENV || 'development')

import useInitNear from "./useCtx";
import * as nearApi from "./api/near";
import * as walletApi from "./api/wallet";

import Login from './components/Login'
import getConfig from "./config";

const App = () => {
  console.log('App...')

  // т.к. при вызове api loginNear происходит редирект, мы не должны
  // хранить состояние isSigned отдельно от прочих данных

  const {
    wallet,
    contract,
    accountId,
    isConnected,
    isSigned
  } = useInitNear()

  console.log('isConnected:', isConnected)
  console.log('isSigned:', isSigned)

  const doLogin = async () => {
    return walletApi.loginNear({
      wallet,
      contractName: config.contractName
    })
  }

  const doLogout = () => {
    walletApi.logoutNear({
      wallet
    })
    document.location.reload();
  }

  return (
    <>
      {isConnected && <Login
        accountId={accountId}
        isSigned={isSigned}
        onClickLogin={doLogin}
        onClickLogout={doLogout}
      />}
      {!isConnected && <h1>notConnected</h1>}
    </>
  )
}

export default App