import React, {useState, useEffect} from "react";
import styles from "./topExpenses.module.css";




const TopExpenses = ({data})=>{

    const [expensesData, setExpensesData] = useState([]);
    
   const[total, setTotal] = useState();

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
        result.sort((a,b)=>{
            return b.value - a.value;
        })
        let t = 0;
        result.reduce((acc, item)=>{
            t+=item.value;
        },{})
        console.log(t);
        setTotal(t);
        setExpensesData(result);
        }
    }, [])

 
    useEffect(()=>{
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
        result.sort((a,b)=>{
            return b.value - a.value;
        })
        let t = 0;
        result.reduce((acc, item)=>{
            t+=item.value;
        },{})
        console.log(t);
        setTotal(t);
        setExpensesData(result);
        }
    },[data])


    return(
        <div className={styles.topExpensesContainer}>
            <h1>Top Expenses</h1>

            <div className={styles.barContainer}>

                {expensesData && expensesData.map((ele, idx)=>(
                    <div className={styles.lines} key={idx}>
                        <h4>{ele.name}</h4>

                       <hr style={{width:`${Number(ele.value)*10/ total}rem`, height:'1.4rem',borderRadius:'0px 20px 20px 0px', backgroundColor:'#8784D2'}}/>
                    
                    </div>
                ))}

            </div>

        </div>

    )

}

export default TopExpenses;