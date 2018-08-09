import React from "react";
import {MyMap} from "./MyMap";
import {CoordsSlider} from './CoordsSlider';

export class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			itinerary: this.props.itinerary,
			coords: this.props.itinerary[0].location,
			place: this.props.itinerary[0]
		}
		this.changeCoords = this.changeCoords.bind(this);
	}

	changeCoords(newPlace){
		this.setState({
			place: newPlace,
			coords: newPlace.location
		})
	}

	componentWillReceiveProps(nextProps) {
            this.setState({
            	itinerary: nextProps.itinerary,
				place: nextProps.itinerary[0],
				coords: nextProps.itinerary[0].location
            });
        }

	render(){
		return (
			<div>
				<MyMap itinerary={this.state.itinerary} coords={this.state.coords} />
				<CoordsSlider itinerary={this.state.itinerary} place={this.state.place} onChange={this.changeCoords}/>
			</div>
			)
	}
}