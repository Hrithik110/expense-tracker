import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import Main from './components/Main/Main';

function App() {

const[isModalOpen, setisModalOpen] = useState(false);
  return (
      <SnackbarProvider>

        <div className="App">
          <Main setisModalOpen={setisModalOpen}/>
        </div>
      </SnackbarProvider>


  );
}

export default App;
