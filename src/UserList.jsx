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
    <div className='max-w-screen mx-auto p-5'>
      <div className='flex flex-col lg:flex-row justify-between items-center mb-4 mx-2'>
        <div className='flex gap-4 mb-4 lg:mb-0'>
          <div className='relative w-full lg:w-auto'>
            <input
              type='text'
              placeholder='Search by name...'
              className='input input-bordered w-full pr-10'
              value={search}
              onChange={handleSearchChange}
            />
            <button className='absolute top-0 right-0 rounded-l-none btn btn-square'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 6h13M8 12h13m-13 6h13'
                />
              </svg>
            </button>
          </div>
          <select
            className='select select-bordered w-full lg:w-auto'
            value={sortKey}
            onChange={handleSortChange}
          >
            <option value=''>Sort by</option>
            <option value='firstName'>Name</option>
            <option value='email'>Email</option>
            <option value='company'>Company Name</option>
          </select>
        </div>
        <button
          className='btn btn-primary self-start lg:self-center'
          onClick={handleOpenModal}
        >
          Add User
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 2xl:gap-8'>
        {loading ? (
          <div className='col-span-full flex justify-center items-center h-full'>
            Loading...
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className='flex flex-col p-2'>
              <UserCard user={user} />
            </div>
          ))
        ) : (
          <div className='col-span-full flex justify-center items-center h-full'>
            <p className='text-center p-4'>No data found.</p>
          </div>
        )}
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUserAdded={handleUserAdded}
      />
    </div>
  );
};

export default UserList;
