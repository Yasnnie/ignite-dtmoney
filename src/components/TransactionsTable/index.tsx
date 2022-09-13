import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transictions {
    id: number;
    value: number;
    title: string;
    type: string;
    category: string;
    createdAt: string;
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<Transictions[]>([])
    useEffect(() => {
        api.get("/transactions").then(res => setTransactions(res.data.transactions))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item) =>
                    (
                        <tr>
                            <td>{item.title}</td>
                            <td className={item.type}>{
                                new Intl.NumberFormat('pt-BR',
                                    {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }
                                )
                                    .format(item.value)}</td>
                            <td>{item.category}</td>
                            <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(item.createdAt))}</td>
                        </tr>
                    )
                    )}

                </tbody>
            </table>
        </Container>
    );
}