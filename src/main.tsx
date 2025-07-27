// import 'preact/devtools';
import { render } from 'react'
import { App } from './app'
import './index.css'

render(
  <App />,
  (() => {
    const app = document.createElement('div')
    document.body.append(app)
    return app
  })(),
)
