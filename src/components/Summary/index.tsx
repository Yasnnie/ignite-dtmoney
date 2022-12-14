
import { Container } from "./styles";
import incomenImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"
import { useTransaction } from "../../hooks/useTransactions";

export function Summary() {
    const { transactions } = useTransaction()


    const summary = transactions.reduce((acc, transactions) => {
        if (transactions.type === "deposit") {
            acc.deposists += transactions.value
            acc.total += transactions.value
        } else {
            acc.withdraw += transactions.value
            acc.total -= transactions.value
        }
        return acc
    }, {
        deposists: 0,
        withdraw: 0,
        total: 0
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomenImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }
                ).format(summary.deposists)}</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }
                ).format(summary.withdraw)}</strong>
            </div>
            <div className="backgroundHighlight">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR',
                    {
                        style: 'currency',
                        currency: 'BRL'
                    }
                ).format(summary.total)}</strong>
            </div>

        </Container>
    );
}