import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import {firebaseDB} from './functions/firebase';
import {connect} from 'react-redux';

class App extends Component {

	componentDidMount = () => {
		if(window.navigator.online === false) {

		} else {
			firebaseDB.ref('/contacts').once('value')
			.then((snapshot) => {

				localStorage.setItem('contacts', JSON.stringify(snapshot.val()));

				let contactsArr = [];
				snapshot.forEach((contact)=> {
					contactsArr.push(contact.val());
				})

				for (let i=0; i< contactsArr.length; i++) {
					this.props.addNewContact(contactsArr[i]);
				}

				
			})
			.then(()=> {
				let lastContacts = JSON.parse(localStorage.getItem('lastContacts'))
				console.log(lastContacts);
				if(lastContacts) {
					lastContacts.forEach((item)=> {
						this.props.addToLastContacts(item.id, item.time)
					})
				}
			})
		}
	}

  render() {
    return (
    	<BrowserRouter>
	      <div className="App">
	        <Layout/>
	      </div>
      </BrowserRouter>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
	return {
		addNewContact: (newContact) => dispatch({type: 'ADD_CONTACT', contact: newContact}),
		addToLastContacts: (currentId, time) => dispatch({type: 'ADD_TO_LAST', id: currentId, time: time})
	}
}


export default connect(null, mapDispatchToProps)(App);
