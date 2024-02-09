const UserCard = ({ user }) => {
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure>
        <img src={user.image} alt='User' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          {user.firstName} {user.lastName}
        </h2>
        <p>Email: {user.email}</p>
        <p>Address: {`${user.address.address}, ${user.address.city}`}</p>
        <p>Company: {user.company.name}</p>
      </div>
    </div>
  );
};

export default UserCard;
