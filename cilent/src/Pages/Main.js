import React from "react";
import { Header } from "../components/Header";
import Balance from "../components/Balance";
import IncomeExpenses from "../components/IncomeExpenses";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import Logout from "../components/Logout";

import { GlobalProvider } from "../context/GlobalState";

import "../App.css";

function App() {
  return (
    <div className="main-body">
      <GlobalProvider>
        <div className="left-side">
          <div className="main-balance">
            <Balance />
          </div>
          <div className="main-add">
            <AddTransaction />
          </div>
        </div>
        <div className="right-side">
          <div className="main-income">
            <IncomeExpenses />
          </div>
          <div className="main-transaction">
            <TransactionList />
          </div>
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
