import React from 'react';

function ContactsPreviewCard(props) {
	return (
		<div className='ui raised segment'>
			<img className='ui mini left floated circular image' src={props.photo} />
			<div className='ui header small' style={{margin: '5px'}}>
				<p>{props.name} {props.surname}</p>
			</div>
			<p>{props.phone}</p>
		</div>
	)
}

export default ContactsPreviewCard;