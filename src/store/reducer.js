const initialState = {
	contacts: []
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
        contacts: state.contacts.concat(newContact)
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