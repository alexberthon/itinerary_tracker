import React, { Component } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import './App.css';
import SimpleAppBar from './SimpleAppBar';
import {MainContainer} from './MainContainer';
import {MapContainer} from './MapContainer';
import {PostsContainer} from './PostsContainer';

const initialItinerary = [
	{
		name: "Paris",
		date: moment("20190101", "YYYYMMDD"),
		dateNumber: 0,
		location: {
			address: "Paris, France",
			lat: 48.850970,
			lng: 2.328626
		}
	}
];

const initialPosts = [];

var formatItinerary = function(response) {

	var itinerary = response
	.map(obj => {
		return obj.acf
	})
	.filter(obj => obj.acf_date !== false && obj.location !== false);

	moment.locale('fr');
	itinerary.forEach(obj => obj.date = moment(obj.acf_date, "YYYYMMDD"));
	itinerary.forEach(obj => obj.location = {
		address: obj.location.address,
		lat: parseFloat(obj.location.lat),
		lng: parseFloat(obj.location.lng)
	});

	itinerary.sort((left, right) => {
		return left.date.diff(right.date);
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

var formatPosts = function(response) {

	var posts = {}

	moment.locale('fr');

	response.forEach(obj => obj.date = moment(obj.acf.acf_date, "YYYYMMDD"));

	response.sort((left, right) => {
		return left.date.diff(right.date);
	});

	response.forEach(obj => {
		var dateNumber = Math.round(
		moment.duration(
			obj.date
			.diff(response[0].date)
			).asDays()
		);

		if(posts.hasOwnProperty(dateNumber)) {
			posts[dateNumber].push(obj);
		} else {
			posts[dateNumber] = [];
			posts[dateNumber].push(obj);
		}
	});
	
	console.log(posts);
	return posts;
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			itinerary: initialItinerary,
			place: initialItinerary[0],
			isLoading: false,
			error : null,
			currentPosts: initialPosts,
			posts: {},
			DEBUG_postDateNumber: 0
		};
		this.changePlace = this.changePlace.bind(this);
	}

	componentDidMount() {
		this.setState({
			isLoading : true,
		});
		//fetch("http://178.62.89.105/blog/wp-json/acf/v3/posts?per_page=100")
		fetch("http://178.62.89.105/blog/wp-json/wp/v2/posts?per_page=100")
		.then(response => response.json())
		.then(data => {
			this.setState({
				itinerary: formatItinerary(data)
			});
			return data;
		})
		.then(data => {
			this.setState({
				posts: formatPosts(data)
			});
		})
		.then(() => {
			fetch("http://178.62.89.105/blog/wp-json/wp/v2/posts?filter[meta_key]=acf_date&filter[meta_value]=" + this.state.itinerary[0].acf_date)
			.then(response => response.json())
			.then(data => {
				this.setState({
					isLoading: false,
					currentPosts: data
				});
			})
		})
		.catch(error => this.setState({ error, isLoading: false }));
	}

	componentDidUpdate(prevProps, prevState){

		//Get the requested posts if isLoading = false & place has changed
		if(prevState.place !== undefined
			&& ((prevState.place.location.lat !== this.state.place.location.lat) || (prevState.place.location.lng !== this.state.place.location.lng))) {

			//Loading
			this.setState({
				isLoading : true,
			});

			//Post already fetched : load from state ; otherwise fetch it
			if(this.state.posts.hasOwnProperty(this.state.place.dateNumber)){
				let dateNumber = this.state.place.dateNumber;
				this.setState({
					isLoading: false,
					currentPosts: this.state.posts[dateNumber],
					DEBUG_postDateNumber: dateNumber
				});

			} else {

				var url = "http://178.62.89.105/blog/wp-json/wp/v2/posts?filter[meta_key]=acf_date&filter[meta_value]=" + this.state.place.date.format("YYYYMMDD");
				let dateNumber = this.state.place.dateNumber;

				fetch(url)
				.then(response => response.json())
				.then(data => {

					var newPosts = this.state.posts;
					newPosts[dateNumber] = data;
					this.setState({
						isLoading: false,
						currentPosts: data,
						posts: newPosts,
						DEBUG_postDateNumber: dateNumber
					});
				})
				.catch(error => this.setState({ error, isLoading: false }));
			}
		}	
	}

	changePlace(newPlace){
		this.setState({
			place: newPlace
		})
	}

	render() {
		return (
			<div className="App" style={{height: '100vh', width: '100%', display:'flex', flexDirection: 'column'}}>
				<SimpleAppBar className="simpleAppBar"/>
				<Grid
					className="mainContainer"
					container
					direction="column"
					justify="flex-start"
				>
					<Grid className="mapSection" item>
						<MapContainer itinerary={this.state.itinerary} isLoading={this.state.isLoading} onChange={this.changePlace}/>
					</Grid>
					<Grid className="postsSection" item>
						<PostsContainer className="PostsContainer" currentPosts={this.state.currentPosts}/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default App;