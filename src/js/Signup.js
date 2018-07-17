import React from 'react';

class Signup extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						<div>Username:</div>
					</label>
					<label>
					</label>
				</form>
			</div>
		);
	}
}