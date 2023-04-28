import React, {useState, useEffect} from 'react';
import CustomTextField from '../../common/custom-textfield';
import './index.css';
import { roles } from '../../constant';
import { getAllUsers } from '../../api/users';
import CustomList from "../../common/custom-list";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getUsers() {
      const response = await getAllUsers({role: roles.LISTENER, isActive: true});
      console.log('response', response);
      if (response?.data?.length) {
        let { data } = response;
        data = data.map(user => ({...user, fullName: `${user.firstName} ${user.lastName}`}));
        setUsers(data);
      };
    };
    getUsers();
  }, []);

  const onUpdateSearchTerm = (_key, value) => {
    setSearchTerm(value);
    // TODO - call API to get users based on search term
    // TODO - update users state
  };
  return (
    <div className='user-container'>
      <span className='header'>Professionals</span>
      <div className='search-container'>
        <CustomTextField
          name='Search'
          value={searchTerm}
          onChange={onUpdateSearchTerm}
        />
        <span style={{marginLeft: '10px'}}>Filters TBD</span>
      </div>
      <div className='user-list-container'>
      <CustomList
          list={users}
          titleKey='fullName'
          imageKey='profilePic'
          buttonTitle='Connect'
          // TODO - allow select to connect
          // selectionKey='_id'
          // selectedId={selectedConnectionId}
          onSelectionChange={(connectionId) => getConversation(connectionId)}
        />
      </div>
    </div>
  );
};

export default Users;
