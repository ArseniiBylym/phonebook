import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContactsPreviewCard from '../Contacts/ContactsPreviewCard/ContactsPreviewCard';

class LastContacts extends Component {
	render() {
		return(
			<div className='Contacts'>
					<div className='ui large brown header' style={{paddingTop: '10px'}}>Last contacts</div>
					
					{this.props.lastPersons.reverse().map((person, i) => {
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