import React from 'react';
import moment from 'moment';
import Slider, { createSliderWithTooltip } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
// Import the components you need as ES2015 modules
import { PlayButton, PauseButton, PlaybackControls } from 'react-player-controls';
import './_controls.scss';

function log(value) {
  console.log(value); //eslint-disable-line
}

function findPlace(val, itinerary) {
	var res = itinerary[0];
	itinerary.forEach(function(el){
		if((val >= el.dateNumber) && (Math.abs(val - el.dateNumber) < Math.abs(val - res.dateNumber))) {
			res = el;
		}
	});
	return res;
}

function findPreviousPlace(val, itinerary) {
	var res = itinerary[0];
	itinerary.forEach(function(el){
		if(el.dateNumber < val && (Math.abs(val - el.dateNumber) < Math.abs(val - res.dateNumber))) {
			res = el;
		}
	});
	return res;
}

function findNextPlace(val, itinerary) {
	var res = itinerary[itinerary.length - 1];
	itinerary.forEach(function(el){
		if(el.dateNumber > val && (Math.abs(val - el.dateNumber) < Math.abs(val - res.dateNumber))) {
			res = el;
		}
	});
	return res;
}

const SliderWithTooltip = createSliderWithTooltip(Slider);
var userSelectUpdating = false;

export class CoordsSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userSelect : this.props.place,
			itinerary: this.props.itinerary,
			sliderValue: 0,
			maxSliderValue: 1,
			isPlaying: false,
			hasPrevious: true,
			hasNext: true,
			hasReceivedItinerary: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handlePlaybackChange = this.handlePlaybackChange.bind(this);
		this.handlePrevious = this.handlePrevious.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.percentFormatter = this.percentFormatter.bind(this);
	}

	componentDidUpdate(prevProps, prevState){

		//Update once after full itinerary is received
		if(prevProps.itinerary.length !== this.props.itinerary.length) {

			const itineraryMarks = {};
			this.props.itinerary.forEach(function(el){
				itineraryMarks[el.dateNumber] = "";
			});

			this.setState({
				hasReceivedItinerary: true,
				itinerary: this.props.itinerary,
				maxSliderValue: this.props.itinerary[this.props.itinerary.length - 1].dateNumber,
				itineraryMarks: itineraryMarks,
				itineraryDateNumbers: this.props.itinerary.map(a => a.dateNumber)
			});
		}

		//Update userSelect
		if(this.state.isPlaying && this.state.hasReceivedItinerary && this.state.itineraryDateNumbers.includes(this.state.sliderValue)){
			/*prevState.userSelect.dateNumber !== this.state.userSelect.dateNumber*/
			var userSelect = this.state.itinerary.find(a => a.dateNumber === this.state.sliderValue);
			
		}

		//Update sliderValue
		if(!userSelectUpdating && this.state.isPlaying && this.state.sliderValue < this.state.maxSliderValue){

			setTimeout(() => {
				
				//Trigger on mark
				if(this.state.itineraryDateNumbers.includes(this.state.sliderValue)) {
					
					userSelectUpdating = true;
					var userSelect = this.state.itinerary.find(a => a.dateNumber === this.state.sliderValue);
					this.setState({userSelect: userSelect});
					this.props.onChange(userSelect);
					userSelectUpdating = false;
				}

				this.setState({
					sliderValue: this.state.sliderValue + 1
				});

				//Pause when marker at the end of slider
				if(this.state.sliderValue === this.state.maxSliderValue) {
					this.setState({isPlaying: false});
				}
				
			}, 20000 / this.state.maxSliderValue);
		}

	}

	handleChange(value) {
		var userSelect = findPlace(value, this.state.itinerary);
		this.setState({
			isPlaying: false,
			sliderValue: value,
			userSelect: userSelect
		});
		this.props.onChange(userSelect);
	}

	handlePlaybackChange(value) {
		this.setState({
			isPlaying: value,
		});
	}

	handlePrevious() {
		var userSelect = findPreviousPlace(this.state.sliderValue, this.state.itinerary);
		this.setState({
			userSelect: userSelect,
			sliderValue: userSelect.dateNumber
		});
		this.props.onChange(userSelect);
	}

	handleNext() {
		var userSelect = findNextPlace(this.state.sliderValue, this.state.itinerary);
		this.setState({
			userSelect: userSelect,
			sliderValue: userSelect.dateNumber
		});
		this.props.onChange(userSelect);
	}

	percentFormatter(v) {
		return this.state.itinerary[0].date.clone().add(v, 'days').format("DD/MM/YYYY");
	}

	render() {

		return (
			<div className="CoordsSlider" style={{}}>
			
			<PlaybackControls
			isPlayable={true}
			isPlaying={this.state.isPlaying}
			showPrevious={true}
			hasPrevious={this.state.hasPrevious}
			showNext={true}
			hasNext={this.state.hasNext}
			onPlaybackChange={this.handlePlaybackChange}
			onPrevious={this.handlePrevious}
			onNext={this.handleNext}
			/>

			<SliderWithTooltip
			className="MySlider"
			value={this.state.sliderValue}
			tipFormatter={this.percentFormatter}
			tipProps={{ overlayClassName: 'tipProps' }}
			onChange={this.handleChange}
			marks={this.state.itineraryMarks}
			min={0}
			max={this.state.maxSliderValue}
			step={1}
			dotStyle={{ 
				borderColor: '#545454',
				bottom: -9,
				marginLeft: -3
			}}
			activeDotStyle={{ borderColor: 'dimgrey' }}
			handleStyle={[{
				marginTop: 0,
				marginLeft: 0,
				width: 2,
				height: 18,
				borderRadius: '25%',
				border: 'none',
				background: 'white'
			}]}
			trackStyle={[{
				height: 18,
				borderRadius: '12px 0px 0px 12px',
				backgroundColor: '#B70F11'
			}]}
			railStyle={{
				height: 18,
				borderRadius: 12,
				backgroundColor: '#4a4e50'
			}}
			/>

			</div>
			);
	}

}