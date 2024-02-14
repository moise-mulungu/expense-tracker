import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/auth'
import { ExpenseTracker } from './pages/expense-tracker'

function App() {
  // DM: good that you learned react-router-dom, but isn't nextjs much better (less "boilerplate" code)?
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
