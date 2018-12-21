import React from 'react';
import MediaQuery from 'react-responsive';
import Grid from '@material-ui/core/Grid';

function MainContainer(props) {

	return (
		<div style={{display:'flex', flexGrow:1}}>
			<MediaQuery maxWidth={799}>
				<Grid
					className="mainContainer"
					container
					direction="column"
					justify="flex-start"
					alignItems="stretch"
					>
					{props.children}
				</Grid>
			</MediaQuery>
			<MediaQuery minWidth={800}>
				<Grid
					className="mainContainer"
					container
					direction="row"
					justify="flex-start"
					alignItems="stretch"
					>
					{props.children}
				</Grid>
			</MediaQuery>
		</div>
	);
}

export { MainContainer };