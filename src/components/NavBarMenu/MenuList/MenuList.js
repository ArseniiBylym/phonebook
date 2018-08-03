import React from 'react';
import {Link} from 'react-router-dom';

function MenuList(props) {
	return(
		<div className='MenuList'>
			<ul>
				<li>
					<Link to='/'>Contacts</Link>
				</li>
				<li>
					<Link to='/newContact'>Add new</Link>
				</li>
				<li>
					<Link to='/lastContacts'>Last calls</Link>
				</li>
				<li>
					<Link to='/search'>Search</Link>
				</li>
			</ul>
		</div>
	)
}

export default MenuList;