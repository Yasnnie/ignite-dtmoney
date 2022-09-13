import { createContext, useState, useEffect, ReactNode, useContext } from "react"
import { api } from "../services/api";



export interface Transictions {
    id: number;
    value: number;
    title: string;
    type: string;
    category: string;
    createdAt: string;
}

// Poderia usar a propriedade Pick para selecionar quais campos você quer 
type TransictionInput = Omit<Transictions, "id" | "createdAt">

interface TransactionProviderProps{
    children: ReactNode
}

interface TransactionsContextData {
    transactions: Transictions[]
    createTransaction: (transactionInput: TransictionInput)=> Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData)



export function TransactionProvider({children}:TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transictions[]>([])

    useEffect(() => {
        api.get("/transactions").then(res => setTransactions(res.data.transactions))
    }, [])


    async function createTransaction(transactionInput: TransictionInput){
    
    const res  =   await api.post("/transactions",{...transactionInput, createdAt: new Date()})

    const {transaction} = res.data

    setTransactions([...transactions,transaction ])
    }


    return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
        {children}
    </TransactionsContext.Provider>
    );
}

export function useTransaction(){
    const context = useContext(TransactionsContext)
    return context
}