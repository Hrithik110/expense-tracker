import React, { useEffect, useState } from "react";
import styles from './modal_income.module.css';
import { useSnackbar } from "notistack";
export default function Modal_Expense({ isOpen, setIncome, income }) {

    const [modal, setModal] = useState(isOpen);
    const [localIncome, setLocalIncome] = useState('');
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setLocalIncome(e.target.value);
    }

    const handleButtonClick = () => {
        console.log(localIncome);
        if (localIncome === '' || localIncome<=0) {
            enqueueSnackbar('Please enter valid amount', { variant: 'warning' });

            setModal(true);
        }
        else {
            var balance = localStorage.getItem('balance');
            const newBal = Number(balance) + Number(localIncome);
            localStorage.setItem('balance', newBal);
            setIncome(newBal);
            toggleModal();
        }
    }
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
                <div className={styles.modal}>
                    <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles['modal-content']}>
                        <h1 style={{ color: "black" }}>Add Balance</h1>
                        <form onSubmit={handleButtonClick} className={styles['input-content']}>

                            <input onChange={(e) => handleChange(e)} type="number" name="income" value={localIncome} placeholder="Income Amount" />
                            <div className="buttonContainer">

                                <button type="submit" id={styles.expense}> Add Balance</button>
                                <button id={styles.cancel} onClick={toggleModal}>Cancel </button>
                            </div>

                        </form>


                    </div>
                </div>
            )}

        </>
    );
}