import { Navigate } from 'react-router-dom';

const Logout = () => {
  localStorage.setItem('token', '');
  return <Navigate to={'/'} />
}

export default Logout;