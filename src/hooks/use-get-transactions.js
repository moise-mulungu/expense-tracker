import { useEffect, useState, useCallback } from 'react'
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserInfo } from '../hooks/use-get-user-info'

//MM: the goal of this custom hook is to fetch transactions from firebase, but query is not yet implemented DM TY for pointing out that it is unfinished
//this custom hook is still incomplete, i'll finish it tomorrow
//MM: I anticipated the usage of this custom hook in the future, so I created it in advance.

/*



// For useGetTransaction hook
import { useGetTransaction } from './hooks/use-get-transaction'
const { getTransaction } = useGetTransaction()
getTransaction(transactionId)
*/

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  })

  // Reference to the 'transactions' collection in Firestore

  // Get the userID from the custom hook useGetUserInfo
  const { userID } = useGetUserInfo()

  // Get all transactions for the user
  /*
  howtofirebase:: real-time-update: how to listen for real-time updates in your firebase;** import the necessary Firebase Firestore functions and your Firebase instance, create a query for the Firestore collection you want to listen to, use the onSnapshot function to listen for real-time updates in your Firestore collection,then when you no longer need the snapshot, you can unsubscribe from it.
  */
  const getTransactions = useCallback(async () => {
    let unsubscribe
    try {
      const transactionCollectionRef = collection(db, 'transactions')
      // Query the transactions collection for the user
      const queryTransactions = query(
        transactionCollectionRef,
        where('userID', '==', userID),
        orderBy('createdAt')
      )
      // Subscribe to the query
      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs = [] // Array to hold the transactions

        let totalIncome = 0
        let totalExpenses = 0

        snapshot.forEach((doc) => {
          const data = doc.data()
          const id = doc.id
          // Add the id to the data object
          docs.push({ ...data, id })

          console.log('transaction Number:', Number(data.amount))
          if (data.type === 'expense') {
            totalExpenses += Number(data.amount)
          } else {
            totalIncome += Number(data.amount)
          }
        })

        // update the state with the transactions
        setTransactions(docs)

        const balance = totalIncome - totalExpenses
        setTransactionTotals({ balance, expenses: totalExpenses, income: totalIncome })
      })
    } catch (error) {
      console.log(error)
    }
    // Unsubscribe from the query when the component unmounts
    return () => unsubscribe()
  }, [userID])

  //
  useEffect(() => {
    getTransactions()
  }, [getTransactions])

  // Return the transactions and the getTransactions function
  return { transactions, transactionTotals }
}

/*
For getting the transactions, i queried the transactions collection as follows:
  1. I created a reference to the 'transactions' collection in Firestore
  2. I got the userID from the custom hook useGetUserInfo
  3. I got all transactions for the user using the useCallback hook
  4. I queried the transactions collection for the user using the query function
  5. I subscribed to the query using the onSnapshot function
  6. I updated the state with the transactions using the setTransactions function
  7. I unsubscribed from the query when the component unmounted
  8. I returned the transactions and the getTransactions function
  9. in the ExpenseTracker component, I imported the useGetTransactions hook and used it to get the transactions
  10. i mapped through the transactions and displayed them in the ExpenseTracker component

But when running the app, I got the following error:
the query requires an index. You can create it here: https://console.firebase.google.com/project/expense-tracker-3c3e7/database/firestore/indexes?create_index=...
to solve that error, i created the index in the firebase console by:
  11. clicking on the link in the error message
  12. clicking on the "save" button that appears on the popup on the firebase console.
  13. I then ran the app again and the error was gone.

  DM: good
*/
