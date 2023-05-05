import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { handleLike } from '../api/feeds';

const FeedCard = ({ feed, userId }) => {

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        title={feed.title}
        subheader={new Date(feed.createdAt).toLocaleString()}
      />
      <CardMedia
        component="img"
        height="auto"
        image={feed.images[0]}
        alt={feed.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {feed.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
