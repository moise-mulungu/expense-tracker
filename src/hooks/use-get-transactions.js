import { useEffect, useState } from 'react'

//MM: the goal of this custom hook is to fetch transactions from firebase, but query is not yet implemented DM TY for pointing out that it is unfinished
//this custom hook is still incomplete, i'll finish it tomorrow
//MM: I anticipated the usage of this custom hook in the future, so I created it in advance.

/*
usage:
// For useDeleteTransaction hook
import { useDeleteTransaction } from './hooks/use-delete-transaction'
const { deleteTransaction } = useDeleteTransaction()
deleteTransaction(transactionId)

// For useUpdateTransaction hook
import { useUpdateTransaction } from './hooks/use-update-transaction'
const { updateTransaction } = useUpdateTransaction()
updateTransaction(transactionId, { description, transactionAmount, transactionType })

// For useGetTransaction hook
import { useGetTransaction } from './hooks/use-get-transaction'
const { getTransaction } = useGetTransaction()
getTransaction(transactionId)
*/
export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([])

  const getTransactions = async () => {}

  return getTransactions
}
