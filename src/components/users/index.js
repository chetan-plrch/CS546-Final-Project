import React, {useState, useEffect} from 'react';
import CustomTextField from '../../common/custom-textfield';
import './index.css';
import { roles } from '../../constant';
import { getAllUsers } from '../../api/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function getUsers() {
      const response = await getAllUsers({role: roles.listener, isActive: true});
      console.log('response', response);
      //setUsers(response?.data?.users);
    };
    getUsers();
  }, []);

  const onUpdateSearchTerm = (key, value) => {
    setSearchTerm(value);
    // TODO - call API to get users based on search term
    // TODO - update users state
  };
  return (
    <div className='user-container'>
      <div className='search-container'>
        <CustomTextField
          name='Search'
          value={searchTerm}
          onChange={onUpdateSearchTerm}
        />
        <span style={{marginLeft: '10px'}}>Filters TBD</span>
      </div>
    </div>
  );
};

export default Users;
