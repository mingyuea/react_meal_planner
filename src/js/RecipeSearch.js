import React from 'react';
import Style from '../scss/RecipeSearch.scss';

class RecipeSearch extends React.Component {
	constructor(props){
		super(props);

		this.handleSearch = this.handleSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSearch(e){
		e.preventDefault();
		const whtSpace = /\s/g;
		let searchStr = this.props.searchVal.replace(whtSpace, "+");
		this.props.onSearch(searchStr, 0);
	}

	handleChange(e){
		let inVal = e.target.value;
		this.props.onSearchChange(inVal);
	}

	render(){
		return(
			<div className={Style.srchCont}>
				<form onSubmit={this.handleSearch}>
					<label className={Style.srchLabel}>
						Recipe search(e.g. "Chicken", "Beef Teriyaki", etc.)
					</label>
					<input type="text" onChange={this.handleChange} value={this.props.searchVal} />
					<input type="submit" value="Search" className={Style.srchBtn} />					
				</form>
			</div>
		);
	}
}

export default RecipeSearch;