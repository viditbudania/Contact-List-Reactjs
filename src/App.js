import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Contacts from './component/Contacts'
var contactLists = require("./contacts");

function App() {
  console.log(contactLists);
  return (
    <div className="App">
      <header className="App-header">
       <h1>Contact List</h1>
       </header>
        <div>
          
          {/* {Contacts} */}
        <Contacts />
        </div>
         
        
    </div>
  );
}

export default App;
