import React from 'react';
import ReactDOM from 'react-dom';
import InitGreet from './InitGreet';
import Login from './Login';
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
			"initContStyle": {display: 'block'},
			"initStyle": {display: 'block'},
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"isSignUp": false,
			"loginErr": null,
			"loginStyle": {display: 'none'},
			"schedDisp": {display: 'none'},
			"currName": "Your",
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
						"link": "http://leitesculinaria.com/96610/recipes-baked-eggs.html",
						"rImg": "https://www.edamam.com/web-img/7c0/7c06d6352abacc41e169a954ebc3740e.jpg",
						"rIng": ["Vegetable oil or butter, for the muffin tin", "6 large eggs (choose eggs of a very similar size)", "2 tablespoons chopped, slightly undercooked bacon (figure 2 slices)", "1/4 cup grated Parmesan (optional)", "Salt and freshly ground black pepper, to taste"],
						"rName": "Baked Eggs"
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
				]
			]  
		}

		this.handleInitSel = this.handleInitSel.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
		this.handlePass2Change = this.handlePass2Change.bind(this);
		this.handleInitCancel = this.handleInitCancel.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleDaySelect = this.handleDaySelect.bind(this);
		this.handleDayClose = this.handleDayClose.bind(this);
		this.handleViewMeal = this.handleViewMeal.bind(this);
		this.handleMealDel = this.handleMealDel.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearchClose = this.handleSearchClose.bind(this);
		this.handleRecipeAdd = this.handleRecipeAdd.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleInitSel(choice){
		this.setState({
			initStyle: {display: 'none'}
		});

		if(choice == "login"){
			this.setState({
				"loginStyle": {display: 'block'}
			});
		}
		else if(choice == "signup"){
			this.setState({
				"loginStyle": {display: 'block'},
				"isSignUp": true
			});
		}
		else{
			this.setState({
				"currName": "Your",
				"initContStyle": {display: 'none'},
				"schedDisp": {display: 'block'}
			});
		}
	}

	handleUserChange(input){
		this.setState({
			"uInput": input
		});
	}

	handlePassChange(input){
		this.setState({
			"pInput": input
		});
	}

	handlePass2Change(input){
		this.setState({
			"p2Input": input
		});
	}

	handleInitCancel(whichStyle){
		let stateObj = {
			"initStyle": {display: 'block'},
			"loginStyle": {display: 'none'},
			"loginErr": null,
			"uInput": "",
			"pInput": "",
			"p2Input": "",
			"isSignUp": false
		};

		this.setState(stateObj);
	}

	handleLogin(){
		let initSuccess;

		if(this.state.isSignUp){ //filters out signup issues
			if(this.state.pInput != this.state.p2Input){
				this.setState({
					"loginErr": "Passwords must match"
				});
			}
			else if(this.state.uInput.length == 0){
				this.setState({
					"loginErr": "You must have a username"
				});
			}
			else if(this.state.pInput.length == 0){
				this.setState({
					"loginErr": "Password cannot be empty"
				});
			}
			else if(this.state.pInput.length < 6){
				this.setState({
					"loginErr": "Password must be at least 6 characters long"
				});
			}
			else{  //this controls the signup function if no prev problems
				let url = 'https://still-lake-64008.herokuapp.com/signup';
				let signupObj = {
					'username': this.state.uInput,
					'password': this.state.pInput,
					'meals': this.state.meals
				};

				fetch(url, {
					method: 'POST',
					body: JSON.stringify(signupObj),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => res.json())
				.then(data => {
					if(data.openName){
						return true;
					}
					else{
						this.setState({
							"loginErr": "Username taken"
						});
						return false;
					}
				})
				.then(result => {
					if(result){
						let currName = this.state.uInput + '\'s';
						this.setState({
							"initContStyle": {display: 'none'},
							"schedDisp": {display: 'block'},
							"pInput": "",
							"p2Input": "",
							"isSignUp": false,
							"currName": currName
						});
					}
				});
			}
		}
		else{ //this controls the login function
			let url = 'https://still-lake-64008.herokuapp.com/login';
			let loginObj = {
				'username': this.state.uInput,
				'password': this.state.pInput,
			};

			this.setState({
				"loadingMsg": "Loading..."
			})

			fetch(url, {
				method: 'POST',
				body: JSON.stringify(loginObj),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(resObj => {
				if(resObj.login){
					let currName = this.state.uInput + '\'s';
					this.setState({
						"meals": resObj.meals,
						"initContStyle": {display: 'none'},
						"schedDisp": {display: 'block'},
						"pInput": "",
						"p2Input": "",
						"isSignUp": false,
						"currName": currName,
						"loadingMsg": null
					});
				}
				else{
					this.setState({
						"loginErr": "Username/Password incorrect",
						"loadingMsg": null
					});
				}
			});

		}

		if(initSuccess){
			this.setState({
				"initContStyle": {display: 'none'},
				"schedDisp": {display: 'block'},
				"pInput": "",
				"p2Input": "",
				"isSignUp": false
			});
		}
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

	handleViewMeal(ind){ 
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

		this.handleUpdate();
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

		this.handleUpdate();
	}

	handleUpdate(){ //this updates the meal schedule for the database
		let url = 'https://still-lake-64008.herokuapp.com/update';
		let updateObj = {
			"username": this.state.uInput,
			"meals": this.state.meals
		};
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(updateObj),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		});
	}

	render() {
		return(
			<div className={Style.block}>
				<div className={Style.initCont} style={this.state.initContStyle}>
					<InitGreet style={this.state.initStyle} handleInitSel={this.handleInitSel} />
					<Login style={this.state.loginStyle} username={this.state.uInput} password={this.state.pInput} onUChange={this.handleUserChange} onPChange={this.handlePassChange} onP2Change={this.handlePass2Change} onCancel={this.handleInitCancel} onSubmit={this.handleLogin} signup={this.state.isSignUp} loading={this.state.loadingMsg} err={this.state.loginErr} />
				</div>
				<h3 className={Style.title}>{this.state.currName} Two Week Meal Planner</h3>
				<div style={this.state.schedDisp}>
					<Schedule meal={this.state.meals} onSelect={this.handleDaySelect} />
				</div>
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