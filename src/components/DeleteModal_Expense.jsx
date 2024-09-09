import React, { useState , useEffect} from "react";

import { useSnackbar } from "notistack";


export default function DeleteModal_Expense({ isOpen, setExpenses , setExpense, setIncome,income, expense, id}) {
 
    
    const [modal, setModal] = useState(isOpen);
    const [localExpense, setLocalExpenses] = useState([]);
    const [price, setPrice] = useState(0);

    const handleDelete = ()=>{

        alert('Are you sure you want to delete this expense?');
        debugger;
        const index = localExpense.findIndex(ele => ele.id == id);

        setPrice(localExpense[index].price);        
        const updatedExpenses = localExpense.filter(ele => ele.id !== id);

        setExpenses(updatedExpenses);
        localStorage.setItem('expenses',JSON.stringify(updatedExpenses));
        toggleModal();

        
    }
    

    useEffect(()=>{
        const sExpenses = localStorage.getItem('expenses');

        if(sExpenses){
            setLocalExpenses(JSON.parse(sExpenses))
        }
    },[]);

    useEffect(()=>{

        setExpense((prev)=> prev-price);
        localStorage.setItem('balance',(Number(localStorage.getItem('balance'))+Number(price)));
        setIncome((prev)=>prev+price);

    },[price]);


    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }

        // Cleanup: remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('active-modal');
        };
    }, [isOpen]);

 

    return (
        <>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h1 style={{ color: "black" }}>{'Edit Expenses'} </h1>
                           

                                <button id="expenseDelete" onClick={handleDelete}> Delete Expense</button>

                                <button id="cancel" type="cancel" onClick={toggleModal}>Cancel </button>

                                
                        
                            
                    </div>
                </div>
            )}

        </>
    );
}