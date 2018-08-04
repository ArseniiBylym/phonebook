import React from 'react';
import {Link} from 'react-router-dom';
import './MenuList.css';

function MenuList(props) {
	return(
		<div className='MenuList' onClick={props.click}>
			<div>
				<Link to='/'>Contacts</Link>
			</div>
			<div>
				<Link to='/newContact'>Add new</Link>
			</div>
			<div>
				<Link to='/lastContacts'>Last calls</Link>
			</div>
			<div>
				<Link to='/search'>Search</Link>
			</div>
		</div>
	)
}

export default MenuList;