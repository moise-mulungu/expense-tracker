import React, { useState } from 'react'
import { auth } from '../../config/firebase-config'
import { signOut } from 'firebase/auth'
import { useAddTransaction } from '../../hooks/use-add-transactions'
import { useGetTransactions } from '../../hooks/use-get-transactions'
import { useGetUserInfo } from '../../hooks/use-get-user-info'
import { useNavigate } from 'react-router-dom'

export const ExpenseTracker = () => {
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState('expense')

  const { addTransaction } = useAddTransaction()
  const { transactions } = useGetTransactions()
  const { name, profilePhoto } = useGetUserInfo()

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({ description, transactionAmount, transactionType })
  }

  const signUserOut = async () => {
    try {
      await signOut(auth)
      localStorage.clear()
      navigate('/')
    } catch (error) {
      console.log('error signing out', error)
    }
  }
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h1>$0.00</h1>
          </div>
          <div className="income-expense">
            <div className="income">
              <h3>Income</h3>
              <p>$00.00</p>
            </div>
            <div className="expense">
              <h3>Expense</h3>
              <p>$0.00</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(parseFloat(e.target.value))}
            />
            <input
              type="radio"
              id="expense"
              name="type"
              value="expense"
              checked={transactionType === 'expense'}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              name="type"
              value="income"
              checked={transactionType === 'income'}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div>
            <img src={profilePhoto} alt={name} />
            <button onClick={signUserOut}>Sign out</button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { id, description, amount, type } = transaction
            console.log('transaction amount: ', amount)
            return (
              <li key={id}>
                <h4>{description}</h4>
                <p>
                  ${amount} .{' '}
                  <label style={{ color: type === 'expense' ? 'red' : 'green' }}>{type}</label>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
// Path: src/pages/expense-tracker/index.jsx

//(done) DM: todoMM: put this into a .md file in new dir ./setup and provide a link or ai prompt as the source

/*
To fix the transaction amount and the transaction type, i did the following:

  1. Identifying the Problem: added console.log to log the transaction amount for each transaction. i found the transaction type was a string and not a number.

  2. Proposing a Solution: To fix this, I suggested converting transactionAmount to a number using the parseFloat function before adding it to the Firestore document, but i was confused on where to convert the transactionType to a number. 

  3. i checked in the firebase, i found that the amount filed was s string and not a number. i modified the amount in the use-add-transaction, then i checked on the firebase, then the amount was updated to number. but on the console the typeof amount was still a string. i was confused on why the amount was still a string on the console.

  4. Investigating the New Problem: I noticed that in the ExpenseTracker component, transactionAmount was being set to e.target.value in the onChange handler of the amount input field. Since e.target.value is a string, this was causing transactionAmount to be a string, not a number.

  5. Proposing a Solution: To fix this, I suggested parsing e.target.value to a float before setting the transactionAmount state.

  6. that approach worked and i removed the parseFloat from the use-add-transaction. i checked the browser the amount and the ype were not showing up on the browser.

  7. Investigating the New Problem: To investigate this, I added console.log inside the return statement of the ExpenseTracker component to log the amount and type of each transaction. i found that the amount was undefined.

  8. I noticed that in the useAddTransaction hook, the transaction amount was being stored under the key amount, not transactionAmount.

  9. Proposing a Solution: To fix this, I tried changing transactionAmount to amount and transactionType to type when destructuring the transaction object in the ExpenseTracker component. that fixed the issue.

  But i was curious to know why the transactionAmount and transactionType were not showing up on the browser. i asked AI "what the purpose of amount: transactionAmount and type: transactionType in the object being passed to the addDoc function in the useAddTransaction hook?", AI answer: "The purpose of amount: transactionAmount and type: transactionType in the object being passed to the addDoc function in the useAddTransaction hook is to set the amount and type fields of the new Firestore document to the values of transactionAmount and transactionType, respectively."
*/
