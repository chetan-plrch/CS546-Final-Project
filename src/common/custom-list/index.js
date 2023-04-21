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
              return  <ListItem>
                          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                              <Avatar src="/static/images/avatar/1.jpg" />
                          </ListItemDecorator>
                          <ListItemContent>
                              <Typography>{chat.userName}</Typography>
                              <Typography level="body2" noWrap>
                                  {chat.lastMessage}
                              </Typography>
                          </ListItemContent>
                      </ListItem>;
          })}
        </List>
      </Box>
    );
}  