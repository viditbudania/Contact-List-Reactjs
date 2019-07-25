import React, { Component } from "react";
import Popup from "./modal";
import "./modal.css";
//import src from "*.png";
var contactLists = require("../contacts");

class Contacts extends Component {
  state = {
    contactList: contactLists,
    popup: false,
    copyOfContacts: contactLists,
    contentEditable: false,
    // suppressContentEditableWarning : true
  };
  onEditContact = event => {
    //console.log("hi")
    this.state.contentEditable
      ? this.setState({ contentEditable: false })
      : this.setState({ contentEditable: true });
   
    let contact = event.target.parentNode.parentNode.children;;
    console.log(contact);
    let addContactObj = {
        id: parseInt( contact[0].innerText),
        avatar_url: contact[1].children[0].src,
        first_name: contact[2].innerText,
        last_name: contact[3].innerText,
        email: contact[4].innerText,
        phone: contact[5].innerText
      };
     // console.log(addContactObj)

      //console.log(addContactObj["avatar_url"]);
    let index;
    this.state.contactList.forEach(element => {
      //console.log(this.state.contactList.indexOf(element));
      if (element.id === addContactObj.id) {
        index = this.state.contactList.indexOf(element);
      }
    });
    //console.log("index", index);
    let contactAfterUpdate = this.state.contactList.filter(updatingElement => {
      return updatingElement["id"] !== addContactObj["id"];
    });
    contactAfterUpdate.splice(index, 0, addContactObj);
    console.log(contactAfterUpdate);
    this.setState({ contactList: contactAfterUpdate, copyOfContacts: contactAfterUpdate });
  };
  onAdd = () => {
    let input = document.querySelectorAll(".element input");
    console.log(input);
    let addContactObj = [
      {
        id: this.state.contactList.length + 1,
        first_name: input[0].value,
        last_name: input[1].value,
        email: input[2].value,
        avatar_url: `https://robohash.org/${
          input[1].value
        }.png?size=100x100&set=set1`,
        phone: input[3].value
      }
    ];
    let concatContact = this.state.contactList.concat(addContactObj);
    console.log(concatContact);
    this.setState({ contactList: concatContact });
    this.state.popup
      ? this.setState({ popup: false })
      : this.setState({ popup: true });
  };
  onDeleteContact = contact => {
     console.log(contact);
    let contactLi = this.state.contactList.filter(val => {
      return val["id"] !== contact["id"];
    });
    this.setState({ contactList: contactLi });
  };
  onSearch = event => {
    let searchText = event.target.value;
    let searchContact = this.state.copyOfContacts.filter(contacts => {
      return (
        contacts["first_name"].toLowerCase().includes(searchText) ||
        contacts["first_name"].toUpperCase().includes(searchText) ||
        contacts["phone"].includes(searchText)
      );
    });
    console.log(searchContact);
    this.setState({ contactList: searchContact });
  };
  changePopupClass = () => {
    this.state.popup
      ? this.setState({ popup: false })
      : this.setState({ popup: true });
  };
 
  render() {
    return (
      <div>
        {this.state.popup && (
          <Popup add={this.onAdd} popupClass={this.changePopupClass} />
        )}
        <div>
        <div className="input">
          <input placeholder="Search Contact" onChange={this.onSearch} />
          {/* </div>
          <div> */}
          <button
            className="contact-add"
            onClick={() => this.changePopupClass()}
          >
            Add Contact
          </button>
          </div>
        </div>
        <div>
            <div className="main-content">
              <div className="column-name">
                <div>id</div>
                <div>image</div>
                <div className="column-first">first_name</div>
                <div className="column-last">last_name</div>
                
                <div className="column-email">email</div>
                <div className="column-phone">phone</div>
                <div className= "column-button">button</div>
              </div>
            </div>
       
            {this.state.contactList.map(contact => (
               // <ol><li>
              <div className="contact-row" >
              
              <div contentEditable="true">{contact.id}</div>
              
              <div>
                <img src={contact["avatar_url"]} alt=""/>
              </div>
              <div contentEditable={this.state.contentEditable} >
                {contact["first_name"]}
              </div>
              <div contentEditable={this.state.contentEditable}>
                {contact["last_name"]}
              </div>
              <div contentEditable={this.state.contentEditable}>
                {contact["email"]}
              </div>
              <div contentEditable={this.state.contentEditable}>
                {contact["phone"]}
              </div>
              <div>
                <button onClick={this.onEditContact}>
                  edit
                </button>
                <button className="contact-remove"
                  onClick={() => this.onDeleteContact(contact)}>
                  delete
                </button>
              </div>
              
            </div>
            
            ))}
       </div>
       </div>
    );
  }
  
}

export default Contacts;
