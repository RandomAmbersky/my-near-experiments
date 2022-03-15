import React from "react";

export default function WithConnectionPage ({ greeting, onGreetingChange }) {
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  return (
    <main>
      <h1>
        <label
          htmlFor="greeting"
          style={{
            color: 'var(--secondary)',
            borderBottom: '2px solid var(--secondary)'
          }}
        >
          {greeting}
        </label>
        {' '/* React trims whitespace around tags; insert literal space character when needed */}
        {window.accountId}!
      </h1>
      <form onSubmit={async event => {
        event.preventDefault()

        const { fieldset, greeting } = event.target.elements

        const newGreeting = greeting.value

        fieldset.disabled = true

        try {
          // make an update call to the smart contract
          await window.contract.set_greeting({
            message: newGreeting
          })
        } catch (e) {
          alert(
            'Something went wrong! ' +
            'Maybe you need to sign out and back in? ' +
            'Check your browser console for more info.'
          )
          throw e
        } finally {
          fieldset.disabled = false
        }
        onGreetingChange(newGreeting)
      }}>
        <fieldset id="fieldset">
          <label
            htmlFor="greeting"
            style={{
              display: 'block',
              color: 'var(--gray)',
              marginBottom: '0.5em'
            }}
          >
            Change greeting
          </label>
          <div style={{ display: 'flex' }}>
            <input
              autoComplete="off"
              defaultValue={greeting}
              id="greeting"
              onChange={e => setButtonDisabled(e.target.value === greeting)}
              style={{ flex: 1 }}
            />
            <button
              disabled={buttonDisabled}
              style={{ borderRadius: '0 5px 5px 0' }}
            >
              Save
            </button>
          </div>
        </fieldset>
      </form>
      <p>
        Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
      </p>
      <ol>
        <li>
          Look in <code>src/App.js</code> and <code>src/utils.js</code> – you'll see <code>get_greeting</code> and <code>set_greeting</code> being called on <code>contract</code>. What's this?
        </li>
        <li>
          Ultimately, this <code>contract</code> code is defined in <code>assembly/main.ts</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
        <li>
          When you run <code>yarn dev</code>, the code in <code>assembly/main.ts</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code> at the <code>scripts</code> section to find the <code>dev</code> command.</li>
      </ol>
      <hr />
      <p>
        To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
      </p>
    </main>
  )
}