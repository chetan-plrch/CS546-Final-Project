import React, {useState, useEffect} from 'react';
import CustomTextField from '../../common/custom-textfield';
import './index.css';
import { getAllUsers } from '../../api/users';
import CustomList from '../../common/custom-list';
import CustomFilter from '../../common/custom-filter';
import { useNavigate } from 'react-router-dom';
import { roles, expertFilterOptions } from '../../helper/constants';
import { getUserId, getUserRole } from '../../helper';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const loggedInUserId = getUserId();
  const userRole = getUserRole();

  useEffect(() => {
    async function getUsers() {
      const response = await getAllUsers({role: roles.LISTENER, isActive: true});
      if (response?.data?.length) {
        let { data } = response;
        data = data.map(user => ({...user, fullName: `${user.firstName} ${user.lastName}`}));
        setUsers(data);
      };
    };
    getUsers();
  }, []);

  const updateExpertList = (optionIds) => {
    // Based on options (connected and disconnected), filter users list on frontend
    setFilterOptions(optionIds);
    if (optionIds?.length) {
      let filteredUsers = JSON.parse(JSON.stringify(users));
      // options: 1 == connected, 2 == disconnected
      if (optionIds.length === 1) {
        if (optionIds.includes(1)) {
          filteredUsers = filteredUsers?.filter((user) => user?.connections?.active?.includes(loggedInUserId));
        } else {
          filteredUsers = filteredUsers?.filter((user) => !user?.connections?.active?.includes(loggedInUserId));
        };
      };
      setFilteredUsers(filteredUsers);
    } else {
      setFilteredUsers([]);
    }
  };

  const onUpdateSearchTerm = (_key, value) => {
    setSearchTerm(value);
    if (!value) {
        setFilteredUsers([]);
    } else {
        let searchResults = JSON.parse(JSON.stringify(users));
        searchResults = searchResults?.filter((user) => user?.fullName?.toLowerCase()?.includes(value?.toLowerCase()));
        setFilteredUsers(searchResults);
    };
  };

  const goToChats = (connection) => {
    navigate('/connections', {state: {connection}});
  };

  return (
    <div className='user-container'>
      <span className='header'>Professionals</span>
      <div className='search-container'>
        <CustomTextField
          name='Search'
          value={searchTerm}
          onChange={onUpdateSearchTerm}
        />{
          userRole === roles.SEEKER ? (
            <CustomFilter
            options={expertFilterOptions}
            selectedIds={filterOptions}
            updateUserFilter={updateExpertList}
          />
          ) : (
            null
          )
        }
      </div>
      <div className='user-list-container'>
      <CustomList
          list={searchTerm || filterOptions?.length ? filteredUsers : users}
          selectionKey='_id'
          titleKey='fullName'
          imageKey='profilePic'
          buttonTitle={userRole === roles.SEEKER ? 'Connect' : ''}
          onButtonClick={goToChats}
        />
      </div>
    </div>
  );
};

export default Users;
