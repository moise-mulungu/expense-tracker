import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth } from './pages/auth'
import { ExpenseTracker } from './pages/expense-tracker'

function App() {
  // DM: good that you learned react-router-dom, but isn't nextjs much better (less "boilerplate" code)? MM: Yes, I agree. I will update the project to use Next.js after I finish the tutorial. DM: good thought, but higher priority is learning firestore-react so you can fix up real-time-chat app.(good)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          {/* DM: todoMM: take 15 minutes to look at nextjs documentation page on "routing: custom errors" and explain in the main (myPortfolio) repo how to create a route in nextjs that does the same thing as <Route path="*" element={<h1>Page Not Found</h1>} />. Add a simple "page not found" route to your myPortfolio repo. Put this in a separate commit and dont work more than 15 minutes on it. */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
