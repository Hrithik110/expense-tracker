import React , { useState, useEffect } from "react";

import styles from "./expenses.module.css";

const Expenses = ({expense, setIsOpen})=>{


const handleOnClick = ()=>{
   
    setIsOpen(prev=>!prev);
}

useEffect(()=>{
},[expense])

return(
    <div className={styles.balanceConatiner}>
        <h2>Expenses: <span>₹{expense}</span></h2>

        <button onClick={handleOnClick}> 
            +Add Expense
        </button>


    </div>

)
}

export default Expenses;