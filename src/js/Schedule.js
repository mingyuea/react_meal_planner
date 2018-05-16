import React from 'react';

class Schedule extends React.Component {
	constructor(props){
		super(props);

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(e){
		let week = e.currentTarget.parentNode.id;
		let day = e.currentTarget.id;
		
		this.props.onSelect(week, day);
	}

	render(){
		const weekArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday"]
		const weekDisp = weekArr.map((item, ind) => <th id={ind}>{item}</th>);

		let schedObj = this.props.meal;
		
		let sched = schedObj.map(weekArr => weekArr.map((dayArr, ind1) => 
			<td id={ind1} className="dayDiv" onClick={this.handleSelect}>{dayArr.map(item => <p>{item.rName}</p>)}</td>));

		return(
			<div>
				<table>
					<thead>
						{weekDisp}
					</thead>
					<tbody>
					<tr id="0" key={"week1"} className="weekTr">
						{sched[0]}
					</tr>
					<tr id="1" key={"week2"} className="weekTr">
						{sched[1]}
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Schedule;