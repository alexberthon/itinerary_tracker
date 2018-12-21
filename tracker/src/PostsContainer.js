import React from 'react';
import Grid from '@material-ui/core/Grid';
import PostCard from './PostCard';
import defaultPostImage from './defaultPostImage.jpg';

const PostsContainer = (props) => (
	<Grid
	container
	className="PostsContainer"
	direction="row"
	justify="center"
	alignItems="stretch"
	style={{
		backgroundColor: '#262626',
		minHeight: 0,
		/*display: 'flex';*/
		/*flexDirection: 'column',*/
		overflow: 'auto'
	}}
	>

		{props.currentPosts.map(function(post){
			return (
				<Grid key={post.id} item xs={11} className="post">
					<PostCard
						title={post.title.rendered}
						content={post.excerpt.rendered}
						imageSrc={post.better_featured_image.media_details.sizes ? post.better_featured_image.media_details.sizes.medium_large.source_url : defaultPostImage}
						link={post.link}
					/>
				</Grid>
				)
		})}

	</Grid>
)

export { PostsContainer }