import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { handleLike, handleUnLike, handleComment, handleSavePost } from '../api/feeds';
import { Box } from '@mui/system';


const FeedCard = ({ feed, userId }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
      <Box>
        <img
          src={feed.images[0]}
          alt={feed.title}
          style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
        />
      </Box>
      <Box flexGrow={1} display="flex" flexDirection="column">
        <CardHeader
          title={feed.title}
          subheader={new Date(feed.createdAt).toLocaleString()}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            {feed.description}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" mt={1}>
            Read more...
          </Typography> */}
        </CardContent>
      </Box>
    </Card>
  );
};

export default FeedCard;
