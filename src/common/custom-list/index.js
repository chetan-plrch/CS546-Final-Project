import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

import './index.css';

function CustomList(props) {
   /*
   * List of objects with below structure
    * {
    * id: '1',
    * title: 'Title',
    * content: 'Content',
    * selected: true // Optional - If selected, it will be highlighted
    * }
    * */
    const { list, selectedId, onSelectionChange } = props
    return (
      <Box sx={{ width: 320 }}>
        <Typography
          id='ellipsis-list-demo'
          level='body4'
          textTransform='uppercase'
          fontWeight='xl'
          mb={1}
          sx={{ letterSpacing: '0.15rem' }}
        >
          Conversations
        </Typography>
        <List
          aria-labelledby='ellipsis-list-demo'
          sx={{ '--ListItemDecorator-size': '56px' }}
        >
          {list?.map(function(item) {
            // TODO - Key needs to be unique
              return  <ListItem
                        key={item.content} className={item.id === selectedId ? 'select-list-item': ''}
                        onClick={() => onSelectionChange(item.id)}
                      >
                          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                              <Avatar src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Ftiny-white-kitten-873941684-2000.jpg' />
                          </ListItemDecorator>
                          <ListItemContent>
                              <Typography>{item.title}</Typography>
                              <Typography level='body2' noWrap>
                                  {item.content}
                              </Typography>
                          </ListItemContent>
                      </ListItem>
          })}
        </List>
      </Box>
    );
};

CustomList.defaultProps = {
    list: [],
    selectedId : '',
    onSelectionChange: () => {}
};

CustomList.propTypes = {
    list: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
    onSelectionChange: PropTypes.func
};

export default CustomList;