import { useEffect, useState } from 'react'

//MM: the goal of this custom hook is to fetch transactions from firebase, but query is not yet implemented DM TY for pointing out that it is unfinished
//this custom hook is still incomplete, i'll finish it tomorrow
export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([])

  const getTransactions = async () => {}

  return getTransactions
}
