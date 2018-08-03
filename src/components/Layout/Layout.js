//dependecies
import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

//components
import NavBarMenu from '../NavBarMenu/NavBarMenu';
import Contacts from '../Contacts/Contacts';
import NewContact from '../NewContact/NewContact'; 
import LastContacts from '../LastContacts/LastContacts';
import Search from '../Search/Search';
import ContactItem from '../ContactItem/ContactItem';

class Layout extends Component {
	state = {

	}

	render() {
		return(
			<div className='Layout'>
				<NavBarMenu />

					<Switch>
						<Route exact path='/newContact' component={NewContact} />
						<Route exact path='/lastContacts' component={LastContacts} />
						<Route exact path='/search' component={Search} />
						<Route exact path='/contactItem' component={ContactItem} />
						<Route path='/' component={Contacts} />
					</Switch>
					
			</div>
		)
	}
}

export default Layout;