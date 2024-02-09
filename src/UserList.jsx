import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import useDebounce from './helpers/hooks/useDebounce';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async (query = '') => {
    setLoading(true);
    try {
      const endpoint = query ? `/search?q=${query}` : '';
      const response = await axios.get(
        `https://dummyjson.com/users${endpoint}`
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchUsers = useDebounce((searchValues) => {
    fetchUsers(searchValues);
  }, 500);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearchUsers(value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold underline mb-4'>User List</h1>
      <div className='form-control w-full max-w-xs mb-4'>
        <input
          type='text'
          placeholder='Search by name...'
          className='input input-bordered w-full max-w-xs'
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <div className='flex flex-wrap justify-center gap-4'>
        {loading ? (
          <div>Loading...</div>
        ) : users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
}

export default UserList;
