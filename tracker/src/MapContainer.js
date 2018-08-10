import React from "react";
import {MyMap} from "./MyMap";
import {CoordsSlider} from './CoordsSlider';

export class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			itinerary: this.props.itinerary,
			place: this.props.itinerary[0]
		}
		this.changePlace = this.changePlace.bind(this);
	}

	changePlace(newPlace){
		this.setState({
			place: newPlace
		})
	}

	componentWillReceiveProps(nextProps) {
            this.setState({
            	itinerary: nextProps.itinerary,
				place: nextProps.itinerary[0]
            });
        }

	render(){
		return (
			<div>
				<MyMap itinerary={this.state.itinerary} place={this.state.place} />
				<CoordsSlider itinerary={this.state.itinerary} place={this.state.place} onChange={this.changePlace} isLoading={this.props.isLoading}/>
			</div>
			)
	}
}