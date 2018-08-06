import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ContactItem.css';

class ContactItem extends Component {

	state = {
		currentItem: ''
	}

	componentDidMount = () => {
		let currentContact = null;
		this.props.contacts.forEach((item, i) => {
			if (item.id == this.props.match.params.id) {
				currentContact = item;
			}
		})
		this.setState({currentItem: currentContact})
	}

	render() {
		if (this.state.currentItem == '') return null
			else return (
				<div className='ContactItem'>
					<div className='ui card'>
						<div className='image'>
							<img src={this.state.currentItem.photo}/>
						</div>
						<div className='content'>
								<div className='header medium'>
									{this.state.currentItem.name} {this.state.currentItem.surname}
								</div>
								<i className="phone volume icon"></i>
									{this.state.currentItem.phone}
								<div className="ui divider"></div>
								<div className='header small'>
									{this.state.currentItem.company}
								</div>
								<i className='envelope outline icon'></i>
									<a href={`mailto:${this.state.currentItem.email}`}>{this.state.currentItem.email}</a>
						</div>
						<div className='ui button green'>
							<a id='telNumber' onClick={()=>{this.props.addToLastContacts(this.state.currentItem.id, new Date())}} href={`tel:${formatTelNumber(this.state.currentItem.phone)}`}>
								Call
							</a>
						</div>
					</div>
				</div>
			)
	}
}

//format tel number string for <a href=tel:...> format 
function formatTelNumber(number) {
	let newNumber = number.slice(0,4) + '-' + number.slice(4,6) + '-' + number.slice(6);
	return newNumber;
}

const mapStateToProps = (state) => {
	return {
		contacts: state.contacts
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToLastContacts: (currentId, time) => dispatch({type: 'ADD_TO_LAST', id: currentId, time: time})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);

