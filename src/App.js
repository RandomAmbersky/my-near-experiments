import 'regenerator-runtime/runtime'
import React from 'react'
import './global.css'

import NoLoginPage from "./components/NoLoginPage";
import WithConnectionPage from "./components/WithConnectionPage";

export default function App() {
  return window.walletConnection.isSignedIn() ? <WithConnectionPage /> : <NoLoginPage/>
}
