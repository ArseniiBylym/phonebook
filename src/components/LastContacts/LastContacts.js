import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContactsPreviewCard from '../Contacts/ContactsPreviewCard/ContactsPreviewCard';
// import './Contacts.css';

class LastContacts extends Component {
	render() {
		return(
			<div className='Contacts'>
					<div className='ui large brown header' style={{paddingTop: '10px'}}>Last contacts</div>
					
					{this.props.lastPersons.map((person, i) => {
						return (
							<ContactsPreviewCard
								key={person.id}
								id = {person.id}
								name={person.name}
								surname={person.surname}
								phone={person.phone}
								photo={person.photo}
								email={person.email}
								company={person.company} 
								time={person.time}/>
						)
					})}
			</div>
		)	
	}
}

const mapStateToProps = (state) => {
	return {
		lastPersons: state.lastContacts
	}
}

export default connect(mapStateToProps, null)(LastContacts);