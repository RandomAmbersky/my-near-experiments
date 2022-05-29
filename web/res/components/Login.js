import React from "react"

/**
 * @param {Object} walletAccount
 * @param {String} accountId
 * @returns {JSX.Element}
 * @constructor
 */
export default function Login ({
  walletAccount,
  accountId
}) {

  const doLogin = async () => {
    return walletAccount.requestSignIn()
  }

  const doLogout = () => {
    walletAccount.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  }

  if (accountId) {
    return (
      <div>
        <span>Signed at {accountId}</span>&nbsp;
        <button onClick={doLogout}>
          <span>Logout</span>
        </button>
      </div>
    )
  }

  return (
    <button onClick={doLogin}>
      <span>Login</span>
    </button>
  )
}
