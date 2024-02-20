import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserInfo } from './use-get-user-info'

/* 

(done: DM: good)DM: ALL the hooks in this directory, I want you to add a usage like this::

usage:

import { useAddTransaction } from './hooks/use-add-transaction'
const { addTransaction } = useAddTransaction()
addTransaction({ description, transactionAmount, transactionType })

*/

export const useAddTransaction = () => {
  const transactionsCollectionRef = collection(db, 'transactions')
  const { userID } = useGetUserInfo()
  const addTransaction = async ({ description, transactionAmount, transactionType }) => {
    await addDoc(
      transactionsCollectionRef,
      {
        userID,
        description,
        amount: transactionAmount,
        type: transactionType,
        createdAt: serverTimestamp(), // Add this line
      },
      // DM: todoMM: the type of transactionAmount is string, but it should be number DM: bump, what is this?
      console.log('transaction amount: ', typeof transactionAmount) 
    )
  }

  return {
    addTransaction,
  }
}
