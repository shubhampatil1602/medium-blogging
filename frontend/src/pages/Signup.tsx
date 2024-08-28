import { useNavigate } from 'react-router-dom';
import Auth from '../components/Auth';
import Quote from '../components/Quote';

const Signup = () => {
  const navigate = useNavigate();
  if (localStorage.getItem('blogging-token')) {
    navigate('/');
  }
  return (
    <section className='w-full flex'>
      <Auth type='signup' />
      <Quote />
    </section>
  );
};

export default Signup;
