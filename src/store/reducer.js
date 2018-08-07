const initialState = {
	contacts: [],
  lastContacts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'ADD_CONTACT':
      let currentPhoto = action.contact.photo != '' ? action.contact.photo : 
      'https://vignette.wikia.nocookie.net/disneyzomibes/images/5/5c/Unknown-avatar.jpg/revision/latest/scale-to-width-down/480?cb=20180310223206';
      const newContact = {
      	name: action.contact.name,
        surname: action.contact.surname,
        phone: action.contact.phone,
        company: action.contact.company,
        photo: currentPhoto,
        email: action.contact.email,
        id: action.contact.id
      }
      return {
        ...state,
        contacts: state.contacts.concat(newContact)
      }

    case 'ADD_TO_LAST':
      let last = {
        id: action.id,
        time: action.time
      };

      let arr = state.lastContacts.slice();
      arr.push(last);
      if(arr.length > 5) arr.shift();

      localStorage.setItem('lastContacts', JSON.stringify(arr))

      return{
        ...state,
        lastContacts: arr
      }

    default: return state
  }
};

export default reducer;