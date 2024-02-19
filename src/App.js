import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/auth'
import { ExpenseTracker } from './pages/expense-tracker'

function App() {
  // DM: good that you learned react-router-dom, but isn't nextjs much better (less "boilerplate" code)? MM: Yes, I agree. I will update the project to use Next.js after I finish the tutorial. DM: good thought, but higher priority is learning firestore-react so you can fix up real-time-chat app.(got it)
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
