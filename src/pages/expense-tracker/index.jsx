import React, { useState } from 'react'
import { useAddTransaction } from '../../hooks/use-add-transactions'
import { useGetTransactions } from '../../hooks/use-get-transactions'
export const ExpenseTracker = () => {
  const [transactionAmount, setTransactionAmount] = useState(0)
  const [description, setDescription] = useState('')
  // const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState('expense')
  const { addTransaction } = useAddTransaction()
  const { transactions } = useGetTransactions()

  const onSubmit = (e) => {
    e.preventDefault()
    addTransaction({ description, transactionAmount, transactionType })
  }
  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
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
              onChange={(e) => setTransactionAmount(e.target.value)}
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
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { id, description, transactionAmount, transactionType } = transaction
            return (
              <li key={id}>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} . <label>{transactionType}</label>
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
