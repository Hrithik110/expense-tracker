import React, { useState, useEffect } from "react";
import styles from "./expenseTracker.module.css";

const ExpenseTracker = ({income, setIncome, setIsOpen})=>{



const handleOnClick = ()=>{
   
    setIsOpen(prev=>!prev);
}
useEffect(()=>{
    const balance = localStorage.getItem('balance');
    setIncome(balance);
},[])
useEffect(()=>{
    const balance = localStorage.getItem('balance');
    setIncome(balance);
},[income])

return(
    <div className={styles.balanceConatiner}>
        <h2>Wallet Balance: <span>₹{income}</span></h2>

        <button onClick={handleOnClick}>
            +Add Income
        </button>


    </div>

)
}

export default ExpenseTracker;