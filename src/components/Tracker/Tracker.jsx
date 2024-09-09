import React, { useState, useEffect } from "react";
import styles from "./tracker.module.css";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import Expenses from "../Expenses/Expenses";
import BasicPie from "../Piechart/BasicPie";
import Modal_Expense from "../Expense_Modal/Modal_Expense";
import Modal_Income from "../Modal_Income";

const Tracker = ({ setExpenses, setIncome, income, sIncome, sExpense, setExpense, expense }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen_income, setIsOpen_income] = useState(false);
   
    
    const options = ['Food', 'Entertainment', 'Travel']

    const [expensesData, setExpensesData] = useState([]);
    if (!sIncome) {
        localStorage.setItem('balance', 5000);
    }
    if (!sExpense) {
        localStorage.setItem('expense', 0);
    }

    useEffect(() => {
        const ex = localStorage.getItem('expense');
        const inc = localStorage.getItem('balance');
        const storedExpensesData = localStorage.getItem('expenses');
        if (storedExpensesData) {
            const expensesArray = JSON.parse(storedExpensesData);
        const result = Object.values(
            expensesArray.reduce((acc, item) => {

                if (!acc[item.category]) {
                    acc[item.category] = { name: item.category, value: 0 };
                }

                acc[item.category].value += item.price;

                return acc;
            }, {})
        )
        setExpensesData(result);
        }
       
        setIncome(inc);
        setExpense(ex);
    }, [])

    useEffect(() => {
        const storedExpensesData = localStorage.getItem('expenses');
        if (storedExpensesData) {
            const expensesArray = JSON.parse(storedExpensesData);
        const result = Object.values(
            expensesArray.reduce((acc, item) => {

                if (!acc[item.category]) {
                    acc[item.category] = { name: item.category, value: 0 };
                }

                acc[item.category].value += item.price;

                return acc;
            }, {})
        )
        setExpensesData(result);
        }

        localStorage.setItem('expense', expense);
        
    }, [expense])

  
    return (
        <div className={styles.trackerContainer}>

            <ExpenseTracker setIsOpen={setIsOpen_income} setIncome={setIncome} income={income} />
            <Expenses setIsOpen={setIsOpen} expense={expense} />

          {expensesData.length ?<div className={styles.pieContainer}>
                <BasicPie data={expensesData} />


            </div> :null}

            {isOpen && <Modal_Expense add={true} setExpense={setExpense} setIncome={setIncome} setExpenses={setExpenses} isOpen={isOpen} options={options} />}
            {isOpen_income && <Modal_Income setIncome={setIncome} isOpen={isOpen_income} income={income} />}
        </div>
    )


}

export default Tracker;