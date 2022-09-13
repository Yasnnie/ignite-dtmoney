import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransaction } from "../../hooks/useTransactions";


import incomenImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import closeImg from "../../assets/close.svg"

import { Container, TransioctionTypeContainer, RadioBox } from "./styles";
interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: ()=> void
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    const { createTransaction } = useTransaction()
    const [type, setType] = useState("deposit")
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")
    const [value,setValue] = useState(0)

   async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault()

        await createTransaction({
            title, 
            type, 
            category, 
            value
        })

        setTitle("")
        setCategory("")
        setType("deposit")
        setValue(0)
        onRequestClose()
    }

    return(
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                 placeholder="Título" 
                 value={title} 
                 onChange={(e)=> setTitle(e.target.value)}
                />

                <input 
                 placeholder="Valor" 
                 type="number" 
                 value={value}
                 onChange={(e)=> setValue(Number(e.target.value))}
                />

                <TransioctionTypeContainer>
                    <RadioBox 
                     type="button" 
                     activeColor="green"
                     isActive={type === "deposit"}
                     onClick={()=> setType("deposit")}>
                        <img src={incomenImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                     type="button" 
                     isActive={type === "withdraw"}
                     activeColor="red"
                     onClick={()=> setType("withdraw")}>
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransioctionTypeContainer>

                <input 
                 placeholder="Categoria" 
                 value={category}
                 onChange={(e)=> setCategory(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal> 
    );
}