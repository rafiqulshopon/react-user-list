import { useState } from 'react';
import axios from 'axios';

const AddUserModal = ({ isOpen, onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    company: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://dummyjson.com/users/add',
        formData
      );
      const { id, firstName, lastName, email, address, company } =
        response.data;
      const newUser = {
        id,
        firstName,
        lastName,
        email,
        address: { address },
        company: { name: company || '' },
      };
      onUserAdded(newUser);
      onClose();
    } catch (error) {
      console.error('Error adding new user: ', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal modal-open'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Add New User</h3>
        <form onSubmit={handleSubmit} className='mt-4'>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            className='input input-bordered w-full mb-2'
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            className='input input-bordered w-full mb-2'
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='input input-bordered w-full mb-2'
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='address'
            placeholder='Address'
            className='input input-bordered w-full mb-2'
            value={formData.address}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='company'
            placeholder='Company Name'
            className='input input-bordered w-full mb-2'
            value={formData.company}
            onChange={handleInputChange}
          />
          <div className='modal-action'>
            <button type='submit' className='btn btn-primary'>
              Add
            </button>
            <button type='button' className='btn' onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
