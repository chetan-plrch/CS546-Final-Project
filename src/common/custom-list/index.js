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

    const { list, selectedId, onSelectionChange, titleKey, contentKey, selectionKey, listTitle, imageKey } = props
    
    // TODO - add default image
    const defaultImage = '';

    return (
      <Box>
        <span className='list-title'>{listTitle}</span>
        <List
          sx={{ '--ListItemDecorator-size': '56px' }}
        >
          {list?.map(function(item, index) {
              return  <ListItem
                        key={index}
                        className={selectedId && item[selectionKey] === selectedId ? 'select-list-item': ''}
                        onClick={() => onSelectionChange(item[selectionKey])}
                      >
                          <ListItemDecorator>
                              <Avatar src={item[imageKey] || defaultImage} />
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
    onSelectionChange: () => {},
    titleKey: 'title', // Key to be used for title
    contentKey: 'content', // Key to be used for content
    selectionKey: 'id', // Key to be used for selection
    // TODO - Remove default image source
    imageKey: 'image' // Key to be used for image
};

CustomList.propTypes = {
    list: PropTypes.array.isRequired,
    selectedId: PropTypes.string,
    onSelectionChange: PropTypes.func,
    titleKey: PropTypes.string.isRequired,
    contentKey: PropTypes.string,
    selectionKey: PropTypes.string,
    listTitle: PropTypes.string,
    imageSource: PropTypes.any
};

export default CustomList;