import React, {Component} from 'react';

//components
import MenuList from './MenuList/MenuList';

//styles
import './NavBarMenu.css';

export default class NavBarMenu extends Component {
	state = {
		isMenuOpen: false
	}

	openMenu = (e) => {
		this.setState({isMenuOpen: true})
	}

	render() {
		let menuList = this.state.isMenuOpen ? (
				<MenuList />
			) : null;

		return (
			<div className='NavBarMenu'>
				<div className='NavBarMenu__icon'>
					<Icon />
				</div>
				<div className='NavBarMenu__header'>
					<p>Phonebook</p>
				</div>
				<div className='NavBarMenu__menu' onClick={this.openMenu}>
					<MenuButton />
				</div>
				{menuList}
			</div>
		)
	}
}

function Icon(props) {
	return(
		<svg viewBox="0 0 463.009 463.009" >
  		<g>
    		<path d="m462.692,381.085c-1.472-11.126-7.895-20.719-17.62-26.318l-114.226-65.767c-13.99-8.055-31.738-5.71-43.157,5.708l-22.499,22.499c-5.987,5.988-15.459,6.518-22.028,1.231-17.737-14.272-35.201-29.979-51.906-46.685-16.705-16.705-32.412-34.168-46.685-51.906-5.287-6.57-4.758-16.041 1.231-22.029l22.498-22.499c11.418-11.417 13.766-29.163 5.709-43.156l-65.767-114.226c-5.6-9.726-15.192-16.148-26.318-17.62-11.127-1.475-22.06,2.236-29.996,10.172l-33.901,33.902c-23.661,23.662-24.041,66.944-1.07,121.875 22.088,52.818 63.308,110.962 116.065,163.721 52.759,52.758 110.903,93.978 163.722,116.066 27.039,11.307 51.253,16.957 71.697,16.956 21.088,0 38.163-6.013 50.178-18.027l33.901-33.902c7.935-7.936 11.643-18.869 10.172-29.995zm-139.33-79.086l114.226,65.767c5.649,3.252 9.379,8.824 10.233,15.286 0.718,5.423-0.691,10.763-3.885,15.066l-151.805-86.638 6.165-6.165c6.631-6.631 16.941-7.994 25.066-3.316zm-243.406-286.811c6.463,0.855 12.034,4.585 15.286,10.234l65.767,114.226c4.68,8.127 3.316,18.435-3.315,25.065l-5.663,5.663-87.114-151.303c3.561-2.637 7.82-4.069 12.26-4.069 0.921-1.77636e-15 1.85,0.061 2.779,0.184zm328.055,419.187c-18.798,18.798-57.244,18.01-105.48-2.162-51.06-21.352-107.491-61.424-158.901-112.833-51.41-51.41-91.482-107.842-112.834-158.901-20.173-48.237-20.96-86.683-2.162-105.482l25.167-25.168 87.245,151.532-5.851,5.851c-11.415,11.416-12.409,29.488-2.311,42.04 14.609,18.156 30.68,36.024 47.764,53.108 17.086,17.085 34.954,33.156 53.109,47.765 12.55,10.098 30.622,9.105 42.04-2.312l5.338-5.338 152.016,86.759-25.14,25.141z"/>
		  </g>
		</svg>
		)
}

function MenuButton(props) {
	return (
		<svg   viewBox="0 0 459 459"  >
			<path d="M0,382.5h459v-51H0V382.5z M0,255h459v-51H0V255z M0,76.5v51h459v-51H0z"/>
		</svg>
	)
}