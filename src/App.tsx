import { Dashboard } from "./components/Dashboards";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import {createServer, Model } from "miragejs"
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root")

createServer({
  models:{
    transaction: Model
  },
  seeds(server){
    server.db.loadData({transactions:[
      {
        id: 1,
        title: "Freelancer de site",
        category:"Trabalho",
        type:"deposit",
        value: 4500,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Aluguel",
        category:"Casa",
        type:"withdraw",
        value: 1000,
        createdAt: new Date()
      }
    ]})
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", ()=>{
      return this.schema.all("transaction");
    })

    this.post("/transactions", (schema,request)=> {
      const data = JSON.parse(request.requestBody)

      return schema.create("transaction", data);
    })
  },
})


function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  const handleOpenNewTransactionModal = () => setIsNewTransactionModalOpen(true)
  const handleCloseNewTransactionModal = () => setIsNewTransactionModalOpen(false)

  return (
    <TransactionProvider>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />

    </TransactionProvider >
  );
}

export default App;
