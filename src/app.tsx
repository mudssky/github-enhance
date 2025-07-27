import { useState } from 'react'
import preactLogo from './assets/preact.svg'
import viteLogo from './assets/preact.svg'
import './app.css'
import { Button } from '@/components/ui/button'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={'!fixed h-[400px] w-screen top-0 bg-white z-50'}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noopener">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <Button
          onClick={() => setCount((count) => count + 1)}
          className={'cursor-pointer'}
        >
          count is {count}
        </Button>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </div>
  )
}
