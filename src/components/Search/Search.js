import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Search.css';
import ContactsPreviewCard from '../Contacts/ContactsPreviewCard/ContactsPreviewCard';

class Search extends Component {

	state = {
		contacts: [],
		value: '',

	}

	inputValue = (e) => {
		this.setState({
			contacts: [],
			value: e.target.value
		})
		let currentValue = e.target.value.toLowerCase();
		for (let i=0; i<this.props.persons.length; i++) {
			if ((this.props.persons[i].name.toLowerCase().indexOf(currentValue) === 0 ||
				this.props.persons[i].surname.toLowerCase().indexOf(currentValue) === 0) &&
				currentValue !== '') {

				this.setState((prevProps) => {
					let arr = prevProps.contacts.slice();
					arr.push(this.props.persons[i]);
					return {
						contacts: arr
					}
				})
			}
		}
	}

	clearInput = (e) => {
		this.setState({
			contacts: [],
			value: '',
		})
	}

	render() {

		let persons = null;
		if(this.state.contacts.length > 0) {
			persons = this.state.contacts.map((item) => {
				return(
					<ContactsPreviewCard
					key={item.id}
					id = {item.id}
					name={item.name}
					surname={item.surname}
					phone={item.phone}
					photo={item.photo}
					email={item.email}
					company={item.company} 
					time={item.time}/>
				)
			})
		}

		return(
			<div className='Search'>
				<div className='ui large brown header' style={{paddingTop: '10px'}}>Find contacts</div>
				<div className="ui icon input">
				  <input 
					  type="text" 
					  placeholder="Search..." 
					  value={this.state.value} 
					  onChange={this.inputValue}
					  onFocus={this.clearInput}></input>
				  <i className="circular search link icon"></i>
				</div>
				<div className='Search__foundItems' style={{paddingTop: '10px'}}>
					{persons}
				</div>
			</div>
		)
	}
	
}

const mapStateToProps = (state) => {
	return {
		persons: state.contacts
	}
}

export default connect(mapStateToProps, null)(Search);