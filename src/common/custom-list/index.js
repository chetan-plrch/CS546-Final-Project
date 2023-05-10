import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import Link from '@mui/joy/Link';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

import CustomButton from '../custom-button';
import './index.css';

function CustomList(props) {

    const {
      list,
      imageKey,
      titleKey,
      viewImage,
      listTitle,
      contentKey,
      selectedId,
      buttonTitle,
      selectionKey,
      alternateList,
      onButtonClick,
      onSelectionChange
    } = props

    const defaultImage = '';

    const [showArchivedChats, setShowArchivedChats] = useState(false);

    const onListItemClick = (selection) => {
      if (!buttonTitle) {
        onSelectionChange(selection);
      };
    };

    const toggleArchiveChat = (selection) => {
      setShowArchivedChats(!showArchivedChats)
      if (showArchivedChats) {
        onSelectionChange(list[0]?.[selectionKey]);
      } else {
        onSelectionChange(selection)
      }
    }

    return (
      <Box className='list-container'>
        <span className='list-title'>{listTitle}</span>

              <Link onClick={() => toggleArchiveChat(alternateList[0]?.[selectionKey])} sx={{padding: '5px', cursor: 'pointer'}}>
                {
                  showArchivedChats ? (
                    <span>Hide Archived Chats</span>
                  ) : (
                    <span>Show Archived Chats</span>
                   )
                }
              </Link>
        <List
          sx={{ '--ListItemDecorator-size': '56px' }}
        >
          {(showArchivedChats ? alternateList : list)?.map(function(item, index) {
              return  (
                <ListItem
                  key={index}
                  className={buttonTitle ? '' : (selectedId && item[selectionKey] === selectedId ? 'selected-item clickable-list-item': 'clickable-list-item')}
                  onClick={() => onListItemClick(item[selectionKey])}>
                    {
                      viewImage ? (
                        <ListItemDecorator component="div">
                          <Avatar alt='Profile Picture' src={item[imageKey] || defaultImage} />
                        </ListItemDecorator>
                      ) : null
                    }
                    <ListItemContent>
                      <Typography>{item[titleKey]}</Typography>
                      {
                        selectedId !== item[selectionKey] ? (
                          <Typography level='body2' noWrap sx={{width: '200px'}}>
                            {item[contentKey]}
                            {
                              item.showUnreadLabel ? (
                                <span className='unread-label'>New</span>
                              ) : null
                            }
                          </Typography>
                        ) : null
                      }
                    </ListItemContent>
                    {
                      buttonTitle ? (
                        <CustomButton title={buttonTitle} onClick={() => onButtonClick(item)} />
                      ) : null
                    }
                </ListItem>)
          })}
        </List>
      </Box>
    );
};

CustomList.defaultProps = {
    list: [], // List of items to be displayed
    listTitle: '', // Title to be displayed for list
    buttonTitle: '', // Title to be used for button. If passed, entire list item will not be clickable
    imageSource: null, // Holds image used for list item
    viewImage: true, // Flag to indicate if image should be displayed
    titleKey: 'title', // Key to be used for title
    imageKey: 'image', // Key to be used for image
    selectionKey: 'id', // Key to be used for selection
    contentKey: 'content', // Key to be used for content
    onButtonClick: () => {}, // Callback function to be called on button click
    onSelectionChange: () => {} // Callback function to be called on list item change
};

CustomList.propTypes = {
    viewImage: PropTypes.bool,
    imageSource: PropTypes.any,
    listTitle: PropTypes.string,
    contentKey: PropTypes.string,
    imageKey: PropTypes.string,
    selectedId: PropTypes.string,
    buttonTitle: PropTypes.string,
    onButtonClick: PropTypes.func,
    selectionKey: PropTypes.string,
    list: PropTypes.array.isRequired,
    onSelectionChange: PropTypes.func,
    titleKey: PropTypes.string.isRequired
};

export default CustomList;