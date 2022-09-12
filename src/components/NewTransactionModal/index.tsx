import Modal from "react-modal";
import { Container, TransioctionTypeContainer, RadioBox } from "./styles";
import incomenImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import closeImg from "../../assets/close.svg"
import { useState } from "react";
interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: ()=> void
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    const [type, setType] = useState("deposit")

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
            <Container>
                <h2>Cadastrar transação</h2>

                <input placeholder="Título" />

                <input placeholder="Valor" type="number"/>

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

                <input placeholder="Categoria" />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal> 
    );
}