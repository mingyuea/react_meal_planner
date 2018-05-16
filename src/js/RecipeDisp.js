import React from 'react';

class RecipeDisp extends React.Component {
	constructor(props){
		super(props)		
	}

	render(){
		let rendBod = 'empty';
		let rendList = '';
		let currStyle = {display: 'none'}
		if(this.props.recipe){
			currStyle = this.props.style;
			rendBod = <div>
				<h2>{this.props.recipe.rName}</h2>
				<img src={this.props.recipe.rImg} />
				<a href={this.props.recipe.link}>Cooking Instructions</a>
			</div>;
			rendList = this.props.recipe.rIng.map(item => <li>{item}</li>);
		}

		return(
			<div style={currStyle}>
				{rendBod}
				<h4>Ingredients:</h4>
				<br />
				<ul>
					{rendList}
				</ul>
				
			</div>
		)
	}
}

export default RecipeDisp;