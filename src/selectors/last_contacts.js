import {createSelector} from 'reselect';

const contactsSelector = state => state.contacts;

const lastContacts = state => state.lastContacts;

const getContacts =(contacts, lastContacts) => {
	let filteredArr = [];
	for (let key in contacts) {
		for (let lastsKey in lastContacts) {
			if (contacts[key].id == lastContacts[lastsKey].id) {
				let obj = {
					...contacts[key],
					time: lastContacts[lastsKey].time
				}
				filteredArr.push(obj)
			}
		}
	}
	return filteredArr;
}

export default createSelector(
	contactsSelector,
	lastContacts,
	getContacts
)