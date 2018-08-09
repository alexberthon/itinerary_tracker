import React from 'react';

const getCoordsFromName = function(name, itinerary) {
	return itinerary.find(obj => obj.name === name).location;
};

const getNameFromCoords = function(coords, itinerary) {
	return itinerary.find(obj => obj.location.lat === coords.lat && obj.location.lng === coords.lng).name;
};

export class CoordsSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userSelect : this.props.coords,
			itinerary: this.props.itinerary
		};
		this.handleUserSelect = this.handleUserSelect.bind(this);
	}

	handleUserSelect(e) {
		
		var userSelect = getCoordsFromName(e.target.value, this.state.itinerary);
		this.setState({
			userSelect : userSelect
		});
		this.props.onChange(userSelect);
	}

	handleChange = (event, value) => {
		this.setState({ sliderValue: value });
	};

	render() {

		const makeOptionItem = function(x){
			return <option value={x}>{x}</option>
		}

		return (
			<div>
				<select onChange={this.handleUserSelect} value={getNameFromCoords(this.state.userSelect, this.state.itinerary)}>
				{this.state.itinerary.map(obj => makeOptionItem(obj.name))}
				</select>
				<h1>SELECT // lat: {this.state.userSelect.lat}, lng: {this.state.userSelect.lng}</h1>
			</div>
		);
	}

}