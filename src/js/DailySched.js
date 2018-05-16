import React from 'react';

class DailySched extends React.Component{
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleDel = this.handleDel.bind(this);
	}

	handleClick(e){
		let mealInd = e.currentTarget.id;
		this.props.onItemSelect(mealInd)
	}

	handleDel(e){
		let mealInd = e.currentTarget.parentNode.id;
		this.props.onDel(mealInd);
	}

	render(){

		let meals = this.props.day.map((obj, ind) => 
			<div id={ind} onClick={this.handleClick}>
				<p>{obj.rName}</p>
				<div onClick={this.handleDel}>X</div>
			</div>);
		
		return(
			<div>
				<h3>Hello</h3>
				{meals}
			</div>
		)
	}
}

export default DailySched;