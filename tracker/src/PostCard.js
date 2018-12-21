import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MediaQuery from 'react-responsive';

const styles = {
  card: {
    /*maxWidth: 250,*/
    margin: '.5rem' 
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

function PostCard(props) {
  const { classes } = props;
  return (
      <Card className={classes.card}>
        <CardMedia
          className="CardMedia"
          image={props.imageSrc}
          title="Contemplative Reptile"
        />
        <CardContent className="CardContent">
          <Typography gutterBottom variant="headline" component="h2" className="CardTitle">
            {props.title}
          </Typography>
          <MediaQuery minWidth={800}>
            <Typography component="p" className="CardText">
              {props.content.substring(0,140)}
            </Typography>
          </MediaQuery>
          <MediaQuery maxWidth={799}>
            <Typography component="p" className="CardText">
              {props.content.substring(0,70)}
            </Typography>
          </MediaQuery>
        </CardContent>
        <CardActions className="CardActions">
          <Button size="small" color="primary" href={props.link} target="_blank">
            Lire
          </Button>
          <Button size="small" color="primary">
            Partager
          </Button>
        </CardActions>
      </Card>
  );
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostCard);