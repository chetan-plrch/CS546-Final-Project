import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function CustomList(props) {
    const { list } = props
    return (
      <Box sx={{ width: 320 }}>
        <Typography
          id="ellipsis-list-demo"
          level="body4"
          textTransform="uppercase"
          fontWeight="xl"
          mb={1}
          sx={{ letterSpacing: '0.15rem' }}
        >
          Conversations
        </Typography>
        <List
          aria-labelledby="ellipsis-list-demo"
          sx={{ '--ListItemDecorator-size': '56px' }}
        >
          {list?.map(function(chat) {
            // TODO - Key needs to be unique
              return  <ListItem key={chat.lastMessage}>
                          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                              <Avatar src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Ftiny-white-kitten-873941684-2000.jpg" />
                          </ListItemDecorator>
                          <ListItemContent>
                              <Typography>{chat.userName}</Typography>
                              <Typography level="body2" noWrap>
                                  {chat.lastMessage}
                              </Typography>
                          </ListItemContent>
                      </ListItem>
          })}
        </List>
      </Box>
    );
}  