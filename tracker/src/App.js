import React, { Component } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import './App.css';
import SimpleAppBar from './SimpleAppBar';
import {MapContainer} from './MapContainer';

const initialItinerary = [
	{
		name: "Paris",
		date: "20190101",
		dateNumber: 0,
		location: {
			lat: 48.850970,
			lng: 2.328626
		}
	}
];

var formatItinerary = function(response) {

	var itinerary = response
	.map(obj => {
		return obj.acf
	})
	.filter(obj => obj.date !== false && obj.location !== false);

	moment.locale('fr');
	itinerary.forEach(obj => obj.date = moment(obj.date, "YYYYMMDD"));
	itinerary.forEach(obj => obj.location = {
		address: obj.location.address,
		lat: parseFloat(obj.location.lat),
		lng: parseFloat(obj.location.lng)
	});

	itinerary.sort((left, right) => {
		return left.date.diff(right.date); // No more need to convert strings to dates
	});

	itinerary.forEach(obj => obj.dateNumber = Math.round(
		moment.duration(
			obj.date
			.diff(itinerary[0].date)
			).asDays()
		)
	);
	return itinerary;
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			itinerary: initialItinerary,
			isLoading: false,
			error : null
		}
	}

	componentDidMount() {
		this.setState({
			isLoading : true,
		});
		fetch("http://178.62.89.105/wp-json/acf/v3/posts?per_page=100")
		.then(response => response.json())
		.then(data => {
			this.setState({
				isLoading: false,
				itinerary: formatItinerary(data)
			});
		})
		.catch(error => this.setState({ error, isLoading: false }));
	}

	render() {
		return (
			<div className="App">
			<SimpleAppBar />
			<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
			>
			<Grid item xs={12} sm={8}>
			<MapContainer itinerary={this.state.itinerary}/>
			</Grid>
			<Grid item xs={12} sm={4}>
			<div></div>
			</Grid>
			</Grid>
			</div>
			);
	}
}

export default App;