import React, { useState } from 'react'
import { useAddTransaction } from '../../hooks/use-add-transactions'
export const ExpenseTracker = () => {
  const [transactionAmount, setTransactionAmount] = useState([])
  const [description, setDescription] = useState('')
  // const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState('expense')
  const { addTransaction } = useAddTransaction()

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
            <h1>$260.00</h1>
          </div>
          <div className="income-expense">
            <div className="income">
              <h3>Income</h3>
              <p>$500.00</p>
            </div>
            <div className="expense">
              <h3>Expense</h3>
              <p>$240.00</p>
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
      </div>
    </>
  )
}
// Path: src/pages/expense-tracker/index.jsx

/*
Steps to create a firebase database and connect it to the application code: 
1. Create the basic structure of the Expense Tracker page. The page should have the following elements:
  1. A div for expense-tracker.
  2. A div for container.
  3. A div for balance.
  4. A div for income

  5. A div for expense.
 
  6. A form for add-transaction.
  7. Input for for description and amount
  8. Input for with the type radio, for expense, and income.
  9. A label for for expense and income
 
  10. A button for with the type submit and the text Add Transaction.
  11. A div for transactions.
2. Setup the firebase database and connect it to the project.
  1. went to firebase console and opened my project.
  2. on the left sidebar, i clicked on firebase database.
  3. clicked on create database.
  4. select either test mode or production mode and click on next.(but i selected the production mode)
  5. clicked on next.
  6. selected the location of my database and clicked on Enable.
  7. a Cloud Firestore database was created with tabs like Rules, Indexes, Usage, and Get Started.
  8. in the data tab there is a collection column that is like a table in a database, and a document column that is like a row in a table.
  9. clicked on the + sign to add a collection, and i named it transactions. but the document can be auto-generated or you can manually add a document.
  10. in order to make the collection work, i needed to change the rules in the rules tab to allow read and write. the rules by default are set to allow read and write only to authenticated users; *allow read, write, if false;*, but we want to allow read and write to anyone. so we change the rules to allow read and write to anyone like this: *allow read, write: if true;* and click on publish.
  11. back in the data tab, i'll have to add a document to the transactions collection that will keep track of the user's id, the description of the transaction, the amount of the transaction, and the type of the transaction(income or expense), and when the transaction was created by ordering from the newest to the oldest.
  12. the document will have the following fields:
    1. user: the user's id.
    2. description: the description of the transaction.
    3. amount: the amount of the transaction.
    4. type: the type of the transaction(income or expense).
    5. createdAt: the date and time the transaction was created.
3. back in the code, i created a custom hook called useAddTransaction that will add a transaction to the firebase database.
4. to allow the useAddTransaction hook to access the firebase database, i need to import a function called addDoc from the firebase/firestore package. this functions allows to add a document to a collection in the firebase database in other words it allows to add a row to a table in a database.
5. the addDoc() function needs a parameter to pass to it, that parameter is collection which will be imported from firebase/firestore
6. to have a reference to the code, i needed another function from firebase/firestore called getFirestore, this is done in the firebase config file.
7. i then passed an object in the addDoc function with key-value pairs
8. used the custom hook inside the ExpenseTracker component
9. in order to get the data from the form input, i created three states; description with a string as default value, transactionAmount with 0 as a default value, and transactionType with "expense" as default value.
10. tested the code on the browser and on the firebase console, so it worked.

*/
