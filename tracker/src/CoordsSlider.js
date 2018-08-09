import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
// Import the components you need as ES2015 modules
import { PlayButton, PauseButton, PlaybackControls } from 'react-player-controls';

function log(value) {
  console.log(value); //eslint-disable-line
}

function percentFormatter(v) {
	return `Jour ${v}`;
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

const SliderWithTooltip = createSliderWithTooltip(Slider);

export class CoordsSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userSelect : this.props.place,
			itinerary: this.props.itinerary,
			sliderValue: 0,
			isPlaying: false,
			hasPrevious: true,
			hasNext: true

		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			itinerary: nextProps.itinerary,
			place: nextProps.place
		});
	}

	handleChange(value) {
		var userSelect = findPlace(value, this.state.itinerary);
		this.setState({
			sliderValue: value,
			userSelect: userSelect
		});
		this.props.onChange(userSelect);
	};

	render() {

		const itineraryMarks = {};

		this.state.itinerary.forEach(function(el){
			itineraryMarks[el.dateNumber] = ""; /*el.location.address*/
		})

		return (
		<div style={{width: "95%", margin: "0 auto"}}>
			<SliderWithTooltip
			tipFormatter={percentFormatter}
			tipProps={{ overlayClassName: 'foo' }}
			onChange={this.handleChange}
			marks={itineraryMarks}
			min={0}
			max={this.state.itinerary[this.state.itinerary.length - 1].dateNumber}
			step={1}
			dotStyle={{ borderColor: 'orange' }}
			activeDotStyle={{ borderColor: 'green' }}
			/>
			<br/>
			<div style={{}}>
				<PlaybackControls
				isPlayable={true}
				isPlaying={this.state.isPlaying}
				showPrevious={true}
				hasPrevious={this.state.hasPrevious}
				showNext={true}
				hasNext={this.state.hasNext}
				onPlaybackChange={isPlaying => this.setState({ ...this.state, isPlaying })}
				onPrevious={() => alert('Go to previous')}
				onNext={() => alert('Go to next')}
				/>
			</div>
		</div>
		);
	}

}