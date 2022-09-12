import { Dashboard } from "./components/Dashboards";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import {createServer} from "miragejs"
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";

Modal.setAppElement("#root")

createServer({
  routes() {
    this.namespace = "api";
    this.get("/transactions", ()=>{
      return [{
        id:1,
        title: "Transaction 1",
        ammount: 400,
        type: "deposit",
        category: 'Pix do lanche',
        createdAt: new Date()
      }]
    })
  },
})


function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  const handleOpenNewTransactionModal = () => setIsNewTransactionModalOpen(true)
  const handleCloseNewTransactionModal = () => setIsNewTransactionModalOpen(false)

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </>
  );
}

export default App;
