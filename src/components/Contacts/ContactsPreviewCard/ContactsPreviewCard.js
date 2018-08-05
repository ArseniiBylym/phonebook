import React from 'react';
import { Link } from 'react-router-dom';

function ContactsPreviewCard(props) {
	console.log(props)
	return (
		<Link to={`/contactItem/${props.id}`}>
			<div className='ui raised segment' style={{backgroundColor: '#d4dbe2'}}>
				<img className='ui mini left floated image' src={props.photo} />
				<div>
					<div className='ui medium header'>
						{props.name} {props.surname}
					</div>
					<p style={{color: 'gray'}}>
						{props.phone}
					</p>
					{props.time && (
						<p style={{color: 'gray'}}>{new Date(props.time).toLocaleString('ru',{hour: '2-digit',minute: '2-digit',second: '2-digit'})}</p>
						)}
				</div>
			</div>
		</Link>
	)
}

export default ContactsPreviewCard;
