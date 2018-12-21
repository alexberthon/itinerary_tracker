import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 0,
  },
  flex: {
    flexGrow: 1,
    textAlign: 'left'
  }
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className="SimpleAppBar" style={{zIndex: 99}}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography className={classes.flex} variant="title" color="inherit">
            Tracker
          </Typography>
          <Button color="inherit">Aller sur le blog</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);