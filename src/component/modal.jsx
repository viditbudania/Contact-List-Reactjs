import React, { Component } from 'react';
import "./modal.css";
function modal (props) {
   
        return ( 
            <div className = "layer">
                <div className="popup-header">
                    <h1>Adding Element</h1>
                </div>
               
                <div className="popup-content">
                    {/* <div className="element">
                    <label>Id</label>
                    <input />
                    </div> */}
                    <div className="element">
                    <label>First-Name</label>
                    <input name = 'first_name' onChange = {props.handleChange}/>
                    </div>
                    <div className="element">
                    <label>Last-Nmae</label>
                    <input name = 'last_name' onChange = {props.handleChange}/>
                    </div>
                    <div className="element">
                    <label>Email</label>
                    <input name = 'email' onChange = {props.handleChange}/>
                    </div>
                    <div className="element">
                    <label>Phone</label>
                    <input name = 'phone' onChange = {props.handleChange}/>
                    </div>

                </div>
                <div className="buttons">
                    <button onClick = {props.add}>Submit</button>
                    <button onClick = {props.popupClass}>Cancel</button>
                </div>
                
            </div>
            
         )
    
}
 
export default modal;