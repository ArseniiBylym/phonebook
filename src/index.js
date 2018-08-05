import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';
import {firebaseDB} from './functions/firebase';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

window.addEventListener('load',()=>{
	if('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('/sw.js')
		.then(()=>{
			console.log('Service worker is registered!');
		})
		.catch((err)=> {
			console.log('Ups, service worker registration failed (')
		})
	}
})



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
