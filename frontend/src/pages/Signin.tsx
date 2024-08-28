import { useNavigate } from 'react-router-dom';
import Auth from '../components/Auth';
import Quote from '../components/Quote';

const Signin = () => {
  const navigate = useNavigate();
  if (localStorage.getItem('blogging-token')) {
    navigate('/');
  }
  return (
    <section className='w-full flex'>
      <Auth type='signin' />
      <Quote />
    </section>
  );
};

export default Signin;
