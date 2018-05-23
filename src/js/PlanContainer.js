import React from 'react';
import ReactDOM from 'react-dom';
import Schedule from './Schedule';
import DailySched from './DailySched';
import RecipeDisp from './RecipeDisp';
import RecipeSearch from './RecipeSearch';
import ResultDisp from './ResultDisp';
import Style from '../scss/PlanContainer.scss';

class PlanContainer extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			"searchData": [],
			"currSearch": "",
			"searchResDisp": {display: 'none'},
			"currViewDay": [],
			"currViewSched": [],
			"currViewMeal": false,
			"currSearchInd": 0,
			"dailyDisp": {display: 'none'},
			"weekObj": {
				0: "Sunday",
				1: "Monday",
				2: "Tuesday",
				3: "Wednesday",
				4: "Thursday",
				5: "Friday",
				6: "Saturday"
			},
			"meals": [
				[
					[{
						link: "http://leitesculinaria.com/96610/recipes-baked-eggs.html",
						rImg: "https://www.edamam.com/web-img/7c0/7c06d6352abacc41e169a954ebc3740e.jpg",
						rIng: ["Vegetable oil or butter, for the muffin tin", "6 large eggs (choose eggs of a very similar size)", "2 tablespoons chopped, slightly undercooked bacon (figure 2 slices)", "1/4 cup grated Parmesan (optional)", "Salt and freshly ground black pepper, to taste"],
						rName: "Baked Eggs"
					}],
					[],
					[],
					[],
					[],
					[],
					[],
				],
				[
					[],
					[],
					[],
					[],
					[],
					[],
					[],
				],
			]  
		}

		this.handleSearch = this.handleSearch.bind(this);
		this.handleDaySelect = this.handleDaySelect.bind(this);
		this.handleDayClose = this.handleDayClose.bind(this);
		this.handleViewMeal = this.handleViewMeal.bind(this);
		this.handleMealDel = this.handleMealDel.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchClose = this.handleSearchClose.bind(this);
		this.handleRecipeAdd = this.handleRecipeAdd.bind(this);
	}

	handleDaySelect(weekNum, dayNum){
		let daySched = this.state.meals[weekNum][dayNum];
		this.setState({
			"currViewDay": [weekNum, dayNum, this.state.weekObj[dayNum]],
			"currViewSched": daySched,
			"dailyDisp": {display: 'block'}
		});
	}

	handleDayClose(){
		this.setState({
			"dailyDisp": {display: 'none'},
			"currViewMeal": false,
			"currViewDay": [],
			"currViewSched": [],
			"currSearch": "",
			"searchResDisp":{display: 'none'}
		});
	}

	handleSearchChange(newStr){
		this.setState({
			"currSearch": newStr
		});
	}

	handleViewMeal(ind){  //this causes problems with handleMealDel
		let whichDay = this.state.currViewDay;
		let currMeal = this.state.meals[whichDay[0]][whichDay[1]][ind];
		this.setState({
			"currViewMeal": currMeal
		});
	}

	handleMealDel(ind){
		let whichDay = this.state.currViewDay;
		let mealsEdit = [...this.state.meals];

		mealsEdit[whichDay[0]][whichDay[1]].splice(ind, 1);
		this.setState({
			"meals": mealsEdit,
			"currViewMeal": false,
		});
	}

	handleSearch(searchStr, startInd){
		let ind1 = startInd;
		let ind2 = startInd + 10;
		let searchUrl = 'https://api.edamam.com/search?q='+searchStr+'&app_id=cc6a7b52&app_key=3f78ba3395f8a8dee70632e79d733022&from='+ind1+'&to='+ind2;

		fetch(searchUrl)
		.then(res => res.json())
		.then(data => this.setState({
			"searchData": data.hits,
			"searchResDisp": {display: 'block'},
			"currSeach": searchStr,
			"currSearchInd": startInd
		}));
	}

	handleSearchClose(){
		this.setState({
			"searchResDisp": {display: 'none'},
		});
	}

	handleRecipeAdd(ind){
		let recipe = this.state.searchData[ind].recipe;
		let mealsCopy = [...this.state.meals];
		let whichDay = this.state.currViewDay;
		let newRecipeObj = {
			"rName": recipe.label,
			"rIng" : recipe.ingredientLines,
			"rImg": recipe.image,
			"link": recipe.url
		};

		mealsCopy[whichDay[0]][whichDay[1]].push(newRecipeObj);
		this.setState({
			"meals": mealsCopy
		});
	}

	render() {
		return(
			<div className={Style.block}>
				<h3 className={Style.title}>React Two Week Meal Planner</h3>
				<Schedule meal={this.state.meals} onSelect={this.handleDaySelect} />
				<div style={this.state.dailyDisp} className={Style.hiddenCont}>
					<div onClick={this.handleDayClose} className={Style.closeBtn}>CLOSE</div>
					<DailySched day={this.state.currViewSched} dayName={this.state.currViewDay[2]} weekNum={this.state.currViewDay[0]} onItemSelect={this.handleViewMeal} onDel={this.handleMealDel} />
					<RecipeDisp recipe={this.state.currViewMeal} />
					<RecipeSearch searchVal={this.state.currSearch} results={this.state.searchData} onSearchChange={this.handleSearchChange} onSearch={this.handleSearch} />
					<ResultDisp style={this.state.searchResDisp} results={this.state.searchData} currSearch={this.state.currSearch} currInd={this.state.currSearchInd} onRefresh={this.handleSearch} onAdd={this.handleRecipeAdd} onClose={this.handleSearchClose} />
				</div>
			</div>
		);
	}
}

export default PlanContainer;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<PlanContainer />, wrapper) : false;