import React, {useEffect, useState} from "react";
import styles from './main.module.css';

import Tracker from "../Tracker/Tracker";
import RecentTransactions from "../RecentTransactions/RecentTransactions";
import TopExpenses from "../TopExpenses/TopExpenses";

const Main = ({setisModalOpen})=>{


  const[expenses, setExpenses] = useState([]);
  const sIncome = localStorage.getItem('balance')
  const [income, setIncome] = useState(sIncome ? sIncome : 5000);
  const sExpense = localStorage.getItem('expense')
  const [expense, setExpense] = useState(sExpense ? sExpense : 0);
   
  useEffect(()=>{
    console.log(expense);
  },[expenses, income, expense]);

    return(

        <div className={styles.container}>

            <h1>Expense Tracker </h1>

            <Tracker income={income} setIncome={setIncome} sIncome={sIncome}  setExpenses={setExpenses} sExpense={sExpense} expense={expense} setExpense={setExpense}/>

            <div className={styles.transactionsTracker}>
                <RecentTransactions expenses= {expenses} setExpenses={setExpenses} expense={expense} setIncome={setIncome} setExpense={setExpense}/>
                <TopExpenses data={expenses}/>
            </div>

        </div>
    )
}

export default Main;