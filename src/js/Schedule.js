import React from 'react';
import Style from '../scss/Schedule.scss';

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
		const weekArr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri","Sat"]
		const weekDisp = weekArr.map((item, ind) => <th id={ind} className={Style.weekHeader}>{item}</th>);

		let schedObj = this.props.meal;
		
		let sched = schedObj.map(weekArr => weekArr.map((dayArr, ind1) => 
			<td id={ind1} className={Style.weekCell} onClick={this.handleSelect}>{dayArr.map(item => <p>{item.rName}</p>)}</td>));

		return(
			<div className={Style.weekCont}>
				<table className={Style.weekTable}>
					<thead className={Style.weekRow}>
						{weekDisp}
					</thead>
					<tbody>
					<tr id="0" key={"week1"} className={Style.weekRow}>
						{sched[0]}
					</tr>
					<tr id="1" key={"week2"} className={Style.weekRow}>
						{sched[1]}
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Schedule;