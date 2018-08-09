import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import avatar from './avatar.png';

// Define a symbol using SVG path notation, with an opacity of 1.
var lineSymbol = {
  path: 'M 0,-1 0,1',
  strokeOpacity: 1,
  scale: 4
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
	>
	{props.isMarkerShown && <Marker position={props.coords} onClick={props.onMarkerClick} icon={avatar}/>}
	<Polyline
	path={props.itinerary}
	defaultOptions={{
		strokeColor: "black",
		strokeOpacity: 0,
		strokeWidth: 2,
		icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }]
	}}
     />
	</GoogleMap>
	</div>
	)

	class MyMap extends React.PureComponent {
		state = {
			isMarkerShown: false,
			coords: this.props.coords,
			itinerary: this.props.itinerary.map(obj => obj.location)
		}

		componentWillMount() {
		}

		componentDidMount() {
			this.delayedShowMarker();
		}

		componentWillReceiveProps(nextProps) {
			this.setState({
				itinerary: nextProps.itinerary.map(obj => obj.location),
				coords: nextProps.coords
			});
		}

		componentDidUpdate() {
			this.setState({coords: this.props.coords})
		}

		delayedShowMarker = () => {
			setTimeout(() => {
				this.setState({ isMarkerShown: true })
			}, 3000)
		}

		handleMarkerClick = () => {
			this.setState({ isMarkerShown: false })
			this.delayedShowMarker()
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