import React, {Component} from 'react';
import './NewContact.css';
import {firebaseDB, firebaseStorage} from '../../functions/firebase';
import {connect} from 'react-redux';

class NewContact extends Component {
	state = {
		person: {
			name: '',
			surname: '',
			phone: '',
			company: '',
			email: '',
			photo: '',
		},
		showSuccessModal: false,
		showFailureModal: false,
		showSpinnerButton: false
	}

	//trigger every time when user input value into form input element
	formChange = (e) => {
		let target = e.target;
		this.setState(prevState => ({
				person: {
					...prevState.person,
					[target.name]: target.value
				}
			})
		)
	}

	//check is all input fields has some values and is they steel has error class
	isValid = () => {
		let divArr = [...document.querySelectorAll('form div')];

		let isContainsInvalidInput = divArr.some((div, i) => {
			return div.classList.contains('error');
		}) 
		
		let isAllInputsFill = true;
		for (let value in this.state.person) {
			if (this.state.person[value] === '' && value !== 'photo'){
				isAllInputsFill = false;
			}
		}
		return (!isContainsInvalidInput && isAllInputsFill) ? true : false
	}

	//trigger when user click Add button
	addContact = (e) => {
		e.preventDefault();

		let isvalid = this.isValid();
		if(isvalid === false){
			console.log('Not valid')
			this.setState({showFailureModal: true})
			return;
		}

		this.setState({showSpinnerButton: true})
		console.log('Valid')
		
		// navigator.serviceWorker.controller.postMessage(firebaseDB, firebaseStorage)
		this.sendNewContacToDB();
	}

	//send photo to firebaseDB and then send data to the firebase storage
	sendNewContacToDB = () => {
		let data = Object.assign({}, this.state.person);
		let date = +new Date();


		let showSuccessModal = () => {
			this.setState({
				showSuccessModal: true,
				showSpinnerButton: false
			})
		}

		let sentToRudux = (url = '') => {
			let person = {
				...this.state.person,
				photo: url,
				id: date
			}
			console.log(person);
			this.props.addNewContact(person);
		}

		if(this.state.person.photo) {
			let file = document.querySelector('form input[type="file"]').files[0];

			let uploadFile = firebaseStorage.ref('/contacts/photo/').child(file.name).put(file);

			uploadFile.on('state_changed', null, null, function() {
				uploadFile.snapshot.ref.getDownloadURL()
					.then(function(downloadURL) {
						
						firebaseDB.ref('/contacts/').push({
							name: data.name,
							surname: data.surname,
							phone: data.phone,
							company: data.company,
							photo: downloadURL,
							email: data.email,
							id: date
						})
						return downloadURL;
					})
					.then((downloadURL) => {
						console.log('Data was sended');
						sentToRudux(downloadURL)
						showSuccessModal();
					})
					.catch((e) => {
						console.log(e.message);
					})
			})
		} else {
			firebaseDB.ref('/contacts/').push({
				name: data.name,
				surname: data.surname,
				phone: data.phone,
				company: data.company,
				photo: '',
				email: data.email,
				id: date
			})
			.then(() => {
				console.log('Data was sended');
				sentToRudux()
				showSuccessModal();
			})
			.catch((e) => {
				console.log(e.message);
			})
		}
		

	}

	//trigger when user close modal
	hideSuccessModal = () => {
		console.log(this.props.contacts)
		this.setState({
			showSuccessModal: false,
			person: {
				name: '',
				surname: '',
				phone: '',
				company: '',
				photo: '',
				email: ''
			}
		})
	}

	hideFailureModal = () => {
		this.setState({
			showFailureModal: false,
			showSpinnerButton: false
		})
	}

	
	//form validation for add red error style to invalid fields
	formElemBlur = (e) => {
		let target = e.target;
		let value = e.target.value;
		switch (target.name) {
			case 'name':
				if (value === '') target.parentNode.classList.add('error');
				else if(target.parentNode.classList.contains('error')){
					target.parentNode.classList.remove('error');
				}
				break;
			case 'surname':
				if (value === '') target.parentNode.classList.add('error');
				else if(target.parentNode.classList.contains('error')){
					target.parentNode.classList.remove('error');
				}
				break;
			case 'company':
				if (value === '') target.parentNode.classList.add('error');
				else if(target.parentNode.classList.contains('error')){
					target.parentNode.classList.remove('error');
				}
				break;
			case 'phone':
				let str = value.trim().replace(/\s/g, '');
				if (str.length !== 13 || isNaN(str.slice(1))) target.parentNode.classList.add('error')
				else if(target.parentNode.classList.contains('error')){
					target.parentNode.classList.remove('error');
				}
					break;
			case 'email':
				let regExTemp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			if (!regExTemp.test(value)) target.parentNode.classList.add('error');
  			else if(target.parentNode.classList.contains('error')){
					target.parentNode.classList.remove('error');
				}
  			break;
			default: break;
		}
	}

	render() {
		let failureModal = this.state.showFailureModal ? (
				<Modal class='failureModal' hide={this.hideFailureModal}>
					Please, enter the correct values and try again
				</Modal>
			) : null;

		let successModal = this.state.showSuccessModal ? (
				<Modal class='successModal' hide={this.hideSuccessModal}>
					New contact was added!
				</Modal>
			) : null

		let backdrop = this.state.showSuccessModal || this.state.showFailureModal ?
			(<div className='modalBackdrop'></div>) 
			: null

		return(
			<React.Fragment>
			{failureModal}
			{successModal}
			{backdrop}
			<div className='NewContact'>
				<div className="ui large brown header">
					Add new contact
				</div>
				<form className="ui form">
				  <div className="field">
				    <label>First Name</label>
				    <input type="text" name="name" value={this.state.person.name} onBlur={this.formElemBlur} onChange={this.formChange}/>
				  </div>
				  <div className="field">
				    <label>Last Name</label>
				    <input type="text" name="surname" value={this.state.person.surname} onBlur={this.formElemBlur} onChange={this.formChange}/>
				  </div>
				  <div className="field">
				    <label>Phone</label>
				    <input type="text" name="phone" value={this.state.person.phone} onBlur={this.formElemBlur} onChange={this.formChange} placeholder='+38 097 1234567'/>
				  </div>
				  <div className="field">
				    <label>Company</label>
				    <input type="text" name="company" value={this.state.person.company} onBlur={this.formElemBlur} onChange={this.formChange}/>
				  </div>
				   <div className="field">
				   	<label>Add photo</label>
				    <input type="file" name="photo" accept='.jpg, .jpeg, .png, .gif' value={this.state.person.photo} onChange={this.formChange}/>
				  </div>
				  <div className="field">
				    <label>E-mail</label>
				    <input type="email" name='email' placeholder="joe@schmoe.com" value={this.state.person.email} onBlur={this.formElemBlur} onChange={this.formChange}/>
				  </div>
				  <button className={this.state.showSpinnerButton ? "ui button loading primary" : "ui button primary"} type="submit" onClick={this.addContact}>Add</button>
				</form>
			</div>
		</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		contacts: state.contacts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewContact: (newContact) => dispatch({type: 'ADD_CONTACT', contact: newContact})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);

function Modal(props) {
	return (
		<div className={props.class}> 
					<div className='ui medium header'>
						{props.children}
					</div>
					<button 
					className='ui brown button' 
					onClick={props.hide}>
						OK
					</button>
				</div>
		)
}