import React, { useState } from 'react'
import { auth } from '../../config/firebase-config'
import { signOut } from 'firebase/auth'
import { useAddTransaction } from '../../hooks/use-add-transactions'
import { useGetTransactions } from '../../hooks/use-get-transactions'
import { useGetUserInfo } from '../../hooks/use-get-user-info'
import { useNavigate } from 'react-router-dom'
import '../../App.css'

export const ExpenseTracker = () => {
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState('expense')

  const { addTransaction } = useAddTransaction()
  const { transactions, transactionTotals } = useGetTransactions()
  const { name, profilePhoto } = useGetUserInfo()

  const { balance, income, expenses } = transactionTotals

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({ description, transactionAmount, transactionType })
    setDescription('')
    setTransactionAmount(0)
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
            {balance >= 0 ? (
              <h2>${balance}</h2>
            ) : (
              <h2 style={{ color: 'red' }}>-${balance * -1}</h2>
            )}
          </div>
          <div className="income-expense">
            <div className="income">
              <h3>Income</h3>
              <p>${income}</p>
            </div>
            <div className="expense">
              <h3>Expense</h3>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
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
          <div className="profile-section">
            <img className="profile-photo" src={profilePhoto} alt={name} />
            <button className="sign-out-btn" onClick={signUserOut}>
              Sign out
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { id, description, amount, type } = transaction
            // console.log('transaction amount: ', amount)
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

/*
To complete the ExpenseTracker component, I did the following:
1. in the use-get-transactions.js, I :
  - created a new state variable called transactionTotals to store the total income, total expenses, and the balance
  - in the query function, i declared two variables called totalIncome and totalExpenses to store the total income and total expenses, respectively
  - i queried the transactions collection for the user using the query function
  - set a condition to check if the type of the transaction was an expense or income, if it was an expense, i added the amount to the totalExpenses, if it was an income, i added the amount to the totalIncome
  - i updated the state with the transactions using the setTransactions function by passing the balance, expenses, and income to the setTransactionTotals function
  - i finally returned the transactions and the getTransactions function

2. in the expense-tracker component, I:
  - destructured the balance, expenses, and income to the transactionTotals
  - passed the expense, and income in the jsx
  - for the balance is set a condition of checking its value to be red if it has a negative value 
  - added to the input the attribute value of description and totalAmount in order to clean them once the action get executed.
  - i passed the setter functions of them to the onSubmit function

3. In the App.css, I:
  - styled the parent and children containers for a basic styling.
  - imported the style to both the authentication and expense-tracker components.

4. Bug-fix: when i tested code the balance, expenses, and income values were NaN. to fix that:
  - console.logged the Number(data.transactionAmount), the output was NaN
  - console.logged the data.transactionAmount, the output was undefined
  - i checked the transactions collection in the firebase database, then found that transactionAmount was not passed as field in it, i then changed transactionAmount to amount, and did the same with transactionType to type.
  - the issue was fixed.
*/
