const initialState = {
	contacts: [],
  lastContacts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      const newContact = {
      	name: action.contact.name,
        surname: action.contact.surname,
        phone: action.contact.phone,
        company: action.contact.company,
        photo: action.contact.photo,
        email: action.contact.email,
        id: action.contact.id
      }
      return {
        ...state,
        contacts: state.contacts.concat(newContact)
      }
    case 'ADD_TO_LAST':
      let contact = null;
      for (let i=0; i<state.contacts.length; i++) {
        if(state.contacts[i].id == action.id) {
          contact = Object.assign({}, state.contacts[i]);
          break;
        }
      }
      contact.time = action.time;
      let arr = state.lastContacts.slice();
      arr.unshift(contact);
      if(arr.length > 5) arr.pop();

      localStorage.setItem('lastContacts', JSON.stringify(arr.reverse()))

      return{
        ...state,
        lastContacts: arr
      }


    case 'REMOVE_CONTACT':
      return {
        persons: state.contacts.filter(contact => contact.id !== action.contact.id)
      }
    default: return state
  }
  return state;
};

export default reducer;