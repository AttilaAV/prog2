import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function AddTransaction() {
  function refreshPage() {
    window.location.reload(false);
  }
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const { addTransaction, getTransaction } = useContext(GlobalContext);

  Axios.defaults.withCredentials = true;

  //const getData = () => {
  //  Axios.post("http://localhost:3001/getData", {
  //    text: text,
  //    amount: amount,
  //    username: localStorage.getItem("usrnm"),
  //  }).then((response) => {
  //    console.log(response);
  //  });
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit} id="form">
        <div class="form-control">
          <input
            className="add-input"
            type="text"
            value={text}
            id="text"
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div class="form-control">
          <input
            className="add-input"
            type="number"
            id="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          class="btn"
          onClick={refreshPage} //onClick={getData}
        >
          Add transaction
        </button>
      </form>
    </>
  );
}
