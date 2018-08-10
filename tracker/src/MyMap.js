import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import avatar from './avatar.png';

// Define a symbol using SVG path notation, with an opacity of 1.
var lineSymbol = {
	path: 'M 0,-1 0,1',
	strokeOpacity: 1,
	scale: 3
};

const MyMapComponent = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: "80vh", "marginBottom": "4vh" }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap
	)((props) =>
	<div>
	<GoogleMap
	defaultZoom={3}
	defaultCenter={{ lat: 48.859, lng: 2.3498 }}
	center={props.coords}
	debug={console.log("Map render")}
	>
	<Marker position={props.coords} onClick={props.onMarkerClick} icon={avatar}/>
	<Polyline
	path={props.itinerary}
	defaultOptions={{
		strokeColor: "#A22D33",
		strokeOpacity: 0,
		strokeWidth: 2,
		icons: [{
			icon: lineSymbol,
			offset: '0',
			repeat: '20px'
		}],
		geodesic: true
	}}
	/>
	</GoogleMap>
	</div>
	)

	class MyMap extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				isMarkerShown: false,
				coords: this.props.place.location,
				itinerary: this.props.itinerary.map(obj => obj.location)
			}
		}

		componentDidMount() {
		}

		componentDidUpdate(prevProps) {
			if(this.props.place.location.lat !== prevProps.place.location.lat || this.props.place.location.lng !== prevProps.place.location.lng) {
				this.setState({
					itinerary: this.props.itinerary.map(obj => obj.location),
					coords: this.props.place.location
				});
			}
		}

		render() {
			return (
				<div>
				<MyMapComponent
				isMarkerShown={this.state.isMarkerShown}
				onMarkerClick={this.handleMarkerClick}
				coords={this.state.coords}
				itinerary={this.state.itinerary}
				/>
				</div>
				)
		}
	}

	export { MyMap };