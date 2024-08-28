import { ChangeEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput, SigninInput } from 'ssp-blogging-common';
import { BACKEND_URL } from '../constants';
import { RiLoader4Line } from 'react-icons/ri';
import { AuthContext } from '../context/AuthContext';

interface AuthType {
  type: 'signin' | 'signup';
}

const Auth = ({ type }: AuthType) => {
  const [inputs, setInputs] = useState<SignupInput | SigninInput>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'Some Component must be used within an AuthContext.Provider'
    );
  }

  const { setShowAuth } = context;

  const sendUserCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sendRes = await fetch(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        }
      );

      if (sendRes.redirected === false) {
        setLoading(false);
      }
      const token = await sendRes.json();
      localStorage.setItem('blogging-token', `Bearer ${token}`);
      setShowAuth(false);
      if (sendRes.ok) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='md:w-[50%] w-full h-screen flex justify-center flex-col'>
      <div className='mx-auto'>
        <div className='text-center mb-4'>
          <h1 className='font-bold text-3xl mb-1'>
            {type === 'signup' ? 'Create an account' : 'Welcome Back!'}
          </h1>
          <h4 className='text-slate-600/90'>
            {type === 'signup'
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <Link
              to={type === 'signup' ? '/signin' : '/signup'}
              className='underline'
            >
              {type === 'signup' ? 'Signin' : 'Signup'}
            </Link>
          </h4>
        </div>

        <div className='w-[22rem]'>
          <form onSubmit={sendUserCredentials}>
            {type === 'signup' && (
              <InputField
                label='Name'
                placeholder='Enter your name'
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            )}
            <InputField
              label='Email'
              type='email'
              placeholder='Enter your email'
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <InputField
              label='Password'
              type='password'
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              className={`w-full bg-black text-white text-sm rounded-lg p-2.5 mt-3 ${
                loading && 'opacity-80'
              }`}
            >
              {loading ? (
                <span className='flex gap-2 justify-center items-center'>
                  <RiLoader4Line className='animate-spin text-xl' /> Loading...
                </span>
              ) : (
                <span>{type === 'signup' ? 'Sign Up' : 'Sign In'}</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface InputFieldTypes {
  label?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const InputField = ({
  label,
  placeholder,
  onChange,
  type,
}: InputFieldTypes) => {
  return (
    <div className='w-full mb-3'>
      <label className='block mb-2 text-sm font-semibold text-gray-900'>
        {label}
      </label>
      <input
        type={type || 'text'}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
