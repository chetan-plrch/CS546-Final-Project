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
    const { list, selectedId, onSelectionChange, titleKey, contentKey, selectionKey } = props
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
          {list?.map(function(item, index) {
              return  <ListItem
                        key={index}
                        className={item[selectionKey] === selectedId ? 'select-list-item': ''}
                        onClick={() => onSelectionChange(item[selectionKey])}
                      >
                          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                              <Avatar src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Ftiny-white-kitten-873941684-2000.jpg' />
                          </ListItemDecorator>
                          <ListItemContent>
                              <Typography>{item[titleKey]}</Typography>
                              <Typography level='body2' noWrap>
                                  {item[contentKey]}
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
    onSelectionChange: () => {},
    titleKey: 'title', // Key to be used for title
    contentKey: 'content', // Key to be used for content
    selectionKey: 'id' // Key to be used for selection
};

CustomList.propTypes = {
    list: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
    onSelectionChange: PropTypes.func,
    titleKey: PropTypes.string.isRequired,
    contentKey: PropTypes.string,
    selectionKey: PropTypes.string
};

export default CustomList;