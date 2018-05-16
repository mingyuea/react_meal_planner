import React from 'react';

class ResultDisp extends React.Component {
	constructor(props){
		super(props);

		this.handleAdd = this.handleAdd.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handlePrev = this.handlePrev.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleAdd(e){
		let recipeNum = e.currentTarget.parentNode.id;
		this.props.onAdd(recipeNum);
	}

	handleNext(){
		let newInd = Number(this.props.currInd + 10);
		this.props.onRefresh(this.props.currSearch, newInd);
	}

	handlePrev(){
		if(this.props.currInd > 0){
			let newInd = Number(this.props.currInd - 10);
			this.props.onRefresh(this.props.currSearch, newInd);
		}
	}

	handleClose(){
		this.props.onClose();
	}

	render(){
		let resList = 'empty';
		if(this.props.results.length > 0){
				resList = this.props.results.map((item, ind) => 
				<div id={ind}>
					<img src={item.recipe.image} />
					<p>{item.recipe.label}</p>
					<div onClick={this.handleAdd}>+</div>
				</div>
			);
		}

		return(
			<div style={this.props.style}>
				<div onClick={this.handleClose}>X</div>
				<h2>Search Results</h2>
				{resList}
				<div onClick={this.handlePrev}> &#8592 </div>
				<div onClick={this.handleNext}> &#8594 </div>
			</div>
		);
	}
}

export default ResultDisp;