import React, { useState , useEffect} from "react";
import "./modal.styles.css";
import { useSnackbar } from "notistack";


export default function EditModal_Expense({ isOpen, options, setExpenses , setExpense, setIncome, id}) {
 
    
    const [modal, setModal] = useState(isOpen);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const[localExpenses, setLocalExpenses] = useState([]);
    const [priceDiff, setPriceDiff] = useState(0);

    useEffect(() => {
        setModal(isOpen); 
    }, [isOpen]);

    let index = localExpenses.findIndex(ele => ele.id === id);
    useEffect(() => {
        const storedExpenses = localStorage.getItem("expenses");
        if(storedExpenses){
            console.log(storedExpenses.title);
            setLocalExpenses(JSON.parse(storedExpenses))
        }
      }, []);


    const handleSubmit = (e)=>{
        e.preventDefault();
       if(checkValidations(inputVals)){
        
        if(index !==-1){
            setPriceDiff(Number(inputVals.price) - Number(localExpenses[index].price));
            localExpenses[index].title = inputVals.title;
            localExpenses[index].price = Number(inputVals.price);
            localExpenses[index].category = inputVals.category;
            localExpenses[index].date = inputVals.date;
        }
       

          const updatedExpenses = [...localExpenses];
          setExpenses(updatedExpenses); 
          const sExpense = localStorage.getItem('expense');
          const bal = localStorage.getItem('balance');
          const newExp = Number(sExpense)+Number(inputVals.price);

          if(bal<0 || (Number(inputVals.price)>Number(bal))){
            enqueueSnackbar('Insufficient Balance: ₹'+bal, {variant: 'error'});
          }
          else{
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
          toggleModal();
          enqueueSnackbar("Expense added successfully", { variant: "success" });
          }

       } 
       else{
        enqueueSnackbar("Please fill all fields", { variant: "error" });
       }
       

    }

    useEffect(()=>{
        setExpense((prev)=>(Number(prev)+Number(priceDiff)));
        setIncome((prev)=>prev-Number(priceDiff));


        localStorage.setItem('balance',(Number(localStorage.getItem('balance'))-Number(priceDiff)));
        
    },[priceDiff])

    const [inputVals, setInputVals] = useState({
        title: '',
        price: '',
        category: '',
        date: '',
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;

        setInputVals((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    }
    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }

        // Cleanup: remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('active-modal');
        };
    }, [modal]);

 const checkValidations = (data)=>{
    console.log(data.title);
    try{
        if(data.title===''){
            enqueueSnackbar('Please enter the title', {variant: 'warning'})
            return false;
        }
        else if(data.price == ''){
            enqueueSnackbar('Please enter the price', {variant: 'warning'})
            return false;
        }
        else if(data.category == ''){
            enqueueSnackbar('Please Select the valid category', {variant: 'warning'})
            return false;
        }
        else if(data.date == ''){
            enqueueSnackbar('Please enter the valid date', {variant: 'warning'})
            return false;
        }
        else{
            return true;
        }
    }
    catch(e){

    }
   
 }  
    return (
        <>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h1 style={{ color: "black" }}>{'Edit Expenses'} </h1>
                        <form onSubmit={(e)=>handleSubmit(e)} className="input-content">
                            <input onChange={(e)=>handleChange(e)} type="text" name="title" value={inputVals.title} placeholder="Title" />
                            <input onChange={(e)=>handleChange(e)} type="number" name="price" value={inputVals.price} placeholder="Price" required />
                            <select
                                name="category"
                                value={inputVals.selCat}
                                label="Select Option"
                                placeholder="Select Category"
                                required
                                onChange={(e)=>handleChange(e)}
                            >
                                <option value="Select Category" defaultValue>Select Category</option>

                                {options && options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>

                            <input onChange={(e)=>handleChange(e)} min="2000-03-15" max="2030-03-31" type="date" name="date" value={inputVals.date} placeholder="dd/mm/yyyy" required/>
                                <div className="buttonContainer">

                                <button type="submit" id="expense"> Add Expense</button>

                                <button id="cancel" type="cancel" onClick={toggleModal}>Cancel </button>
                                </div>
                                
                        </form>
                        
                            
                    </div>
                </div>
            )}

        </>
    );
}