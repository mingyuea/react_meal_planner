import React from 'react';
import Style from '../scss/ResultDisp.scss';

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
				<div id={ind} className={Style.resCell}>
					<img src={item.recipe.image} className={Style.cellImg} />
					<p className={Style.cellName}>{item.recipe.label}</p>
					<div onClick={this.handleAdd} className={Style.cellAdd}>+</div>
				</div>
			);
		}

		return(
			<div style={this.props.style} className={Style.resCont}>
				<div className={Style.searchClose} onClick={this.handleClose}>X</div>
				<h2>Search Results</h2>
				<div>Search API provided by Edamam</div>
				{resList}
				<div className={Style.next} onClick={this.handlePrev}> Prev </div>
				<div className={Style.prev} onClick={this.handleNext}> Next </div>
			</div>
		);
	}
}

export default ResultDisp;