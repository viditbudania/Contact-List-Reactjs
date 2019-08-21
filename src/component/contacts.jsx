import React, { Component } from "react";
import Popup from "./Modal";
import "./Modal.css";
//import src from "*.png";
var contactLists = require("../contacts");

class Contacts extends Component {
  state = {
    contactList: contactLists,
    popup: false,
    copyOfContacts: contactLists,
    displayStyle:'none',
    contentEditable: false,
    // form:{
      first_name: '',
        last_name: '',
        email: '',
        phone: ''
    // }
    // suppressContentEditableWarning : true
  };
  componentDidMount(){
    localStorage.getItem('contact') && this.setState({
      contactList:JSON.parse(localStorage.getItem('contact'))
    });
    //contactLists = JSON.parse(localStorage.getItem('contact'));
  }
  componentDidUpdate(){
    localStorage.setItem('contact',JSON.stringify(this.state.contactList))
  }
  onEditContact = (event) => {
    //console.log("hi")
    // this.state.contentEditable
    //   ? this.setState({ contentEditable: false })
    //   : this.setState({ contentEditable: true });
    // console.log(element)
  
      this.setState({
        contentEditable: !this.state.contentEditable,
        
      })
      this.state.contentEditable
      ? this.setState({displayStyle:'none'})
      : this.setState({displayStyle:'border'}) 
   
    let contact = event.target.parentNode.parentNode.children;
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
    //let input = document.querySelectorAll(".element input");
    console.log(this.state.first_name);
    console.log(this.state.last_name);
    let addContactObj = [
      {
        id: this.state.contactList.length + 1,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        avatar_url: `https://robohash.org/${
          this.state.last_name
        }.png?size=100x100&set=set1`,
        phone: this.state.phone
      }
    ];
    let concatContact = this.state.contactList.concat(addContactObj);
    console.log(concatContact);
    this.setState({ contactList: concatContact , copyOfContacts:concatContact});
    // this.state.popup
    //   ? this.setState({ popup: false })
    //   : this.setState({ popup: true });
      this.setState({
        popup : !this.state.popup
      })
  };
  onDeleteContact = contact => {
     console.log(contact);
    let contactLi = this.state.contactList.filter(val => {
      return val["id"] !== contact["id"];
    });
    this.setState({ contactList: contactLi ,copyOfContacts:contactLi});
  };
  onSearch = event => {
    let searchText = event.target.value;
    let searchContact = this.state.copyOfContacts.filter(contacts => {
      return (
        contacts["first_name"].toLowerCase().includes(searchText) ||
        contacts["first_name"].toUpperCase().includes(searchText) ||
        contacts["last_name"].toLowerCase().includes(searchText) ||
        contacts["last_name"].toUpperCase().includes(searchText) ||
        contacts["email"].includes(searchText) ||
        contacts["email"].toUpperCase().includes(searchText) ||        
        contacts["phone"].includes(searchText)
      );
    });
    console.log(searchContact);
    this.setState({ contactList: searchContact });
  };
  // changePopupClass = () => {
  //   this.state.popup
  //     ? this.setState({ popup: false })
  //     : this.setState({ popup: true });
  // };
  changePopupClass = () => {
    this.setState({
      popup : !this.state.popup
    })
  };

  handleChange = (event) => {
    console.log(event.target);
    
this.setState({
  [event.target.name] : event.target.value,

})
console.log(this.state)
  }
 
  render() {
    // let displayStyle = {
    //   border : "none"
    // }
    return (
      <div>
        {this.state.popup && (
          <Popup add={this.onAdd} popupClass={this.changePopupClass} handleChange={this.handleChange} />
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
              <div contentEditable={this.state.contentEditable} className={this.state.displayStyle}>
                {contact["first_name"]}
              </div>
              <div contentEditable={this.state.contentEditable} className={this.state.displayStyle}>
                {contact["last_name"]}
              </div>
              <div contentEditable={this.state.contentEditable} className={this.state.displayStyle}>
                {contact["email"]}
              </div>
              <div contentEditable={this.state.contentEditable} className={this.state.displayStyle}>
                {contact["phone"]}
              </div>
              <div>
                <button onClick={(event)=>{this.onEditContact(event)}}>
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
