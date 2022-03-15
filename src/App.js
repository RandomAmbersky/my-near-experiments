import 'regenerator-runtime/runtime'
import React from 'react'
import { logout } from './utils'
import './global.css'

import getConfig from './config'
import NoLoginPage from "./components/NoLoginPage";
import WithConnectionPage from "./components/WithConnectionPage";
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [greeting, set_greeting] = React.useState()
  const [showNotification, setShowNotification] = React.useState(false)

  React.useEffect(
    () => {

      if (window.walletConnection.isSignedIn()) {
        window.contract.get_greeting({ account_id: window.accountId })
          .then(greetingFromContract => {
            set_greeting(greetingFromContract)
          })
      }
    },

    []
  )

  if (!window.walletConnection.isSignedIn()) {
    return (
      <NoLoginPage/>
    )
  }

  const greetingChange = (newGreeting) => {
    set_greeting(newGreeting)
    setShowNotification(true)
    setTimeout(() => {
        setShowNotification(false)
      }, 11000)
  }

  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <>
      <button className="link" style={{ float: 'right' }} onClick={logout}>
        Sign out
      </button>
      <WithConnectionPage greeting={greeting} onGreetingChange={greetingChange} />
      {showNotification && <Notification />}
    </>
  )
}

// this component gets rendered by App after the form is submitted
function Notification() {
  const urlPrefix = `https://explorer.${networkId}.near.org/accounts`
  return (
    <aside>
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.accountId}`}>
        {window.accountId}
      </a>
      {' '/* React trims whitespace around tags; insert literal space character when needed */}
      called method: 'set_greeting' in contract:
      {' '}
      <a target="_blank" rel="noreferrer" href={`${urlPrefix}/${window.contract.contractId}`}>
        {window.contract.contractId}
      </a>
      <footer>
        <div>✔ Succeeded</div>
        <div>Just now</div>
      </footer>
    </aside>
  )
}
