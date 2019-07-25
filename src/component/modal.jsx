import React, { Component } from 'react';
import "./modal.css";
class modal extends Component {
    render() {
    console.log(this.props);
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
                    <input />
                    </div>
                    <div className="element">
                    <label>Last-Nmae</label>
                    <input />
                    </div>
                    <div className="element">
                    <label>Email</label>
                    <input />
                    </div>
                    <div className="element">
                    <label>Phone</label>
                    <input />
                    </div>

                </div>
                <div className="buttons">
                    <button onClick = {this.props.add}>Submit</button>
                    <button onClick = {this.props.popupClass}>Cancel</button>
                </div>
                
            </div>
            
         );
    }
}
 
export default modal;