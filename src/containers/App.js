import React from 'react';
import CardList from '../components/CardList';
//import {robots} from './Robots';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import './App.css';

/* STATE >> prop */
/* this is what describes the APP, what CHANGES!
The APP uses the state to render and pass down as props */
class App extends React.Component{
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ""
		}
	}

	componentDidMount(){
		// console.log('check')
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots: users}));
	}

//THIS CAN ALSO BE WRITTEN LIKE THIS!!
/*
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => {
			response.json()
		})
		.then(users => {
			this.setState({robots: users})
		});
*/		

/* When creating your own functions in React use ARROW function
to keep the binding of THIS */
onSearchChange = (event) => {
	this.setState({searchfield: event.target.value})	
}
	render() {
		const { robots, searchfield } = this.state;
		const filterRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		}) 

		//can also be written like this
		//if(!robots.length)
		if (robots.length === 0) {
			return <h1>Loading</h1>
		} else {
		return (
			<div className = 'tc'>
				<h1 className = "f1">RoboFriends</h1>
				<Searchbox searchChange = {this.onSearchChange} />
				<Scroll>
				<CardList robots = {filterRobots} />
				</Scroll>
			</div>
			)
	}
	}
}

export default App;