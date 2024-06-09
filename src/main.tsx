import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

const rootElement = document.getElementById('root')!;
ReactDOM.createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
)