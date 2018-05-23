import React from 'react';
import Style from '../scss/DailySched.scss';

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
		let meals =[];
		if(this.props.day.length == 0){
			meals = "Nothing here yet, find and add a recipe!";
		}
		else{
		meals = this.props.day.map((obj, ind) => 
			<div id={ind} onClick={this.handleClick} className={Style.schedCell}>
				<img src={obj.rImg} className={Style.cellImg} />
				<p className={Style.cellName}>{obj.rName}</p>
				<div onClick={this.handleDel} className={Style.cellX}>X</div>
			</div>);
		}
		return(
			<div className={Style.schedCont}>
				<h3>{this.props.dayName}, Week {Number(this.props.weekNum) + 1}</h3>
				{meals}
			</div>
		)
	}
}

export default DailySched;