import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserInfo } from './use-get-user-info'

/* 

(done)DM: todoMM: for ALL the hooks in this directory, I want you to add a usage like this::

usage:

import { useAddTransaction } from './hooks/use-add-transaction'
const { addTransaction } = useAddTransaction()
addTransaction({ description, transactionAmount, transactionType })

*/

export const useAddTransaction = () => {
  const transactionsCollectionRef = collection(db, 'transactions')
  const { userID } = useGetUserInfo()
  const addTransaction = async ({ description, transactionAmount, transactionType }) => {
    await addDoc(transactionsCollectionRef, {
      userID,
      description,
      amount: transactionAmount,
      type: transactionType,
    })
  }

  return {
    addTransaction,
  }
}

/* 

DM: todoMM: I forgot to put in the other repo: I want you to take 2 hours to review your Microverse notes on ruby, specifically the database schema design and the SQL queries. Then, I want you to write a schema (i.e., database tables for users, messages, etc) that would work for your real-time-chat app if it were using a ruby back end instead of firestore. Then write teh SQL queries that would be necessary to get the same data that you are getting from firestore in your real-time-chat app.


*/
