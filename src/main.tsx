import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/global.scss'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/styles/style.css'
import '../src/styles/slick.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
