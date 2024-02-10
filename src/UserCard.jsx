import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const formatAddress = (address, city) => {
    return [address, city].filter((part) => part).join(', ');
  };

  return (
    <div className='card w-full h-full bg-base-100 shadow-xl'>
      <figure className='px-4 pt-4'>
        <img src={user.image} alt='User' className='rounded-full' />
      </figure>
      <div className='card-body'>
        <Link to={`/user/${user.id}`} className='card-title'>
          {user.firstName} {user.lastName}
        </Link>
        <p className='truncate'>Email: {user.email}</p>
        <p className='break-words'>
          Address: {formatAddress(user.address.address, user.address.city)}
        </p>
        <p className='truncate'>Company: {user.company.name}</p>
      </div>
    </div>
  );
};

export default UserCard;
