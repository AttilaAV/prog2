import React from "react";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";

function Transaction({ transaction }) {
  function refreshPage() {
    window.location.reload(false);
    deleteTransaction(transaction.id);
  }
  const { deleteTransaction } = useContext(GlobalContext);
  const { getTransactions } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}{" "}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={refreshPage} class="delete-btn">
        x
      </button>
    </li>
  );
}

export default Transaction;
