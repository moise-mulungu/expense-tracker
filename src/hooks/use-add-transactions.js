import { addDoc, collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useGetUserInfo } from './use-get-user-info'

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
