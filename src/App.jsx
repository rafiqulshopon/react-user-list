import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDetails from './UserDetails';
import UserList from './UserList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserList />} />
        <Route path='/user/:id' element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
