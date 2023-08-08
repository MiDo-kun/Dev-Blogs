import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  const [, , removeCookie] = useCookies();
  removeCookie('token');
  return <Navigate to={'/'} />
}

export default Logout;