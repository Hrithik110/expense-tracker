import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { FaGift } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import styles from "./recentTransactions.module.css";
import food from "../../assets/Food.png";
import entertainment from "../../assets/Entertainment.png";
import travel from "../../assets/Travel.png";
import { CiEdit } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import EditModal_Expense from "../Expense_Modal/EditModal_Expense";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DeleteModal_Expense from "../DeleteModal_Expense";


const RecentTransactions = ({expenses, setExpenses, expense, setExpense, income, setIncome}) => {

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [dataLength, setDataLength] = useState(0);
    const optionsCat = ['Food', 'Entertainment', 'Travel']
    const[isEditModal, setIsEditModal] = useState(false);

    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [id, setID] = useState();

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const itemPerPage = 3;
    const src = {
        Food: food,
        Entertainment: entertainment,
        Travel: travel,

    }
    const handleOnClickArrow = (increase)=>{

        if(increase){
            if(Math.ceil(dataLength/itemPerPage)>currentPage){
                setCurrentPage((prev)=>prev+1);
            }
            
        }
        else{
            if(currentPage!==1){
                setCurrentPage((prev)=>prev-1);
            }
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem('expenses');
        if(storedData){
            const  indexOfLastItem = currentPage * itemPerPage;
            const indexOfFirstItem = indexOfLastItem - itemPerPage;
            setData(JSON.parse(storedData).slice(indexOfFirstItem, indexOfLastItem));
            setDataLength(JSON.parse(storedData).length);
        }
        setExpense(expense);
 
    }, [expenses,currentPage, expense, income])

    


    const handleEdit = (id)=>{

        setID(id);
        setIsEditModal((prev)=>!prev);
    }

    const handleDelete = (id)=>{

        setID(id);
        setIsDeleteModal((prev)=>!prev);
    }

    return (
        <div className={styles.transactionsContainer}>
            <h1>Recent Transactions</h1>

            <div className={styles.tableContainer}>

                {
                    data &&
                    data.map(ele => (
                        <div key={ele.id} className={styles.rowContainer}>

                            <div  className={styles.imageContainer}>
                                <img src={src[ele.category]} alt={ele.category} />
                            </div>
                            <div  className={styles.content}>
                                <div  >
                                    <h3 id={styles.title}>{ele.title}</h3>

                                    <h3 id={styles.date}>{new Date(ele.date).toLocaleDateString('en-US', options)}</h3>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-around' }}>

                                    <h3 id={styles.price}>₹ {ele.price}</h3>
                                  <button onClick={()=>handleDelete(ele.id)} style={{border:'none', width:'2.3rem', height:'2.3rem', borderRadius: '15px', marginLeft:'2rem', boxShadow: '0px 4px 4px 0px #00000040', backgroundColor: '#FF0000', cursor:'pointer'}}>
                                  <IoMdCloseCircleOutline  size={'1.5rem'} color="white"/>
                                  </button>
                                    <button onClick={()=>handleEdit(ele.id)} style={{border:'none', width:'2.3rem', height:'2.3rem', borderRadius: '15px', marginLeft:'0.5rem', boxShadow: '0px 4px 4px 0px #00000040', backgroundColor: '#89E148',cursor:'pointer'}} >
                                    <CiEdit size={'1.5rem'} color="white"/>
                                    </button>
                                  
                                </div>
                            </div>
                            <hr className={styles.line} />

                        </div>

                    ))

                }

                {
                    dataLength == 0 && <div style={{position:'relative', left:'0%'}}><h3>No Recent Transactions!! Please add expenses to track.</h3></div>
                }
           {
           dataLength ?  <div style={{position:'relative', left:'40%'}}>
            <button onClick={()=>{handleOnClickArrow(false)}}  style={{border:'none',cursor:'pointer', width:'2rem', height:'2rem', borderRadius: '15px', margin:'0.5rem'}}>
            <FaArrowLeft />
            </button>

            <button style={{border:'none', width:'2rem', margin:'0.5rem', height:'2rem', borderRadius: '12px', color:'white', backgroundColor: '#43967B', boxShadow:' 0px 4px 4px 0px #00000040'}}>{currentPage}</button>
            <button  onClick={()=>{handleOnClickArrow(true)}} style={{border:'none',cursor:'pointer', width:'2rem',margin:'0.5rem', height:'2rem', borderRadius: '15px'}}>
            <FaArrowRight />
            </button>
            </div> : null}
            

            </div>



            {isEditModal && <EditModal_Expense setExpenses={setExpenses} id={id} isOpen={isEditModal} options={optionsCat} setIncome={setIncome} setExpense={setExpense}/>}
            {isDeleteModal && <DeleteModal_Expense setExpenses={setExpenses} id={id} isOpen={isDeleteModal} setIncome={setIncome} setExpense={setExpense}/>}
      
       </div>

    )
}

export default RecentTransactions;