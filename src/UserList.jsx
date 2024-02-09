import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import useDebounce from './helpers/hooks/useDebounce';
import AddUserModal from './AddUserModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async (query = '') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/users${query ? `/search?q=${query}` : ''}`
      );
      let fetchedUsers = response.data.users || [];

      if (sortKey) {
        fetchedUsers = sortUsers(fetchedUsers, sortKey);
      }

      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const sortUsers = (users, key) => {
    const usersCopy = [...users];
    usersCopy.sort((a, b) => {
      const valA =
        key === 'company' ? a.company.name.toUpperCase() : a[key].toUpperCase();
      const valB =
        key === 'company' ? b.company.name.toUpperCase() : b[key].toUpperCase();
      return valA.localeCompare(valB);
    });
    return usersCopy;
  };

  const debouncedSearchUsers = useDebounce((searchValues) => {
    fetchUsers(searchValues);
  }, 500);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearchUsers(value);
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortKey(value);
    setUsers(sortUsers(users, value));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Search by name...'
            className='input input-bordered'
            value={search}
            onChange={handleSearchChange}
          />
          <select
            className='select select-bordered'
            value={sortKey}
            onChange={handleSortChange}
          >
            <option value=''>Sort by</option>
            <option value='firstName'>Name</option>
            <option value='email'>Email</option>
            <option value='company'>Company Name</option>
          </select>
        </div>
        <button className='btn btn-primary' onClick={handleOpenModal}>
          Add User
        </button>
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUserAdded={handleUserAdded}
      />
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
};

export default UserList;
