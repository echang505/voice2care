import './App.css'

import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" data-testid="app-page">
      <header className="App-header">
        <p className="header">
          🚀 Vite + React + Typescript + React Testing Library 🤘 <br />& Eslint
          🔥+ Prettier
        </p>

        <div className="body">
          <button
            onClick={async () => {
              setCount((count) => count + 1);
              const response = await fetch("http://localhost:3000/", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              console.log(data);
            }}
          >
            🪂 Click me : {count}
          </button>

          <p>
            {' '}
            Don&apos;t forgot to install Eslint and Prettier in Your Vscode.
          </p>

          <p>
            Mess up the code in <code>App.tsx </code> and save the file.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer">
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer">
              Vite Docs
            </a>
          </p>
        </div>
      </header>
    </div>
  )
}

export default App
