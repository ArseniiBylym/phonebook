import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContactsPreviewCard from './ContactsPreviewCard/ContactsPreviewCard';
import './Contacts.css';

class Contacts extends Component {
	render() {
		return(
			<div className='Contacts'>
				<div className='Contacts__inner'>
					<div className='ui large brown header' style={{paddingTop: '10px'}}>Contacts</div>
					
					{this.props.persons.map((person, i) => {
						return (
							<ContactsPreviewCard
								key={person.id}
								id = {person.id}
								name={person.name}
								surname={person.surname}
								phone={person.phone}
								photo={person.photo}
								email={person.email}
								company={person.company} />
						)
					})}
					
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

export default connect(mapStateToProps, null)(Contacts);