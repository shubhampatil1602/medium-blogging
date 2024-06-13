import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignupInput } from '@shubhamspatilnbr/blogging-website-common';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    username: '',
    password: '',
  });
  return (
    <div className='h-screen flex justify-center flex-col mx-6'>
      <div className='flex justify-center items-center flex-col min-w-80 mb-6'>
        <h1 className='text-3xl font-bold'>
          {type === 'signin' ? 'Welcome Back' : 'Create an account'}
        </h1>
        <span className='text-gray-500'>
          {type === 'signin'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <Link
            to={type === 'signin' ? '/signup' : '/signin'}
            className='underline'
          >
            {type === 'signin' ? 'Signup' : 'Signin'}
          </Link>
        </span>
      </div>
      <div className=''>
        <form className='max-w-96 flex justify-center items-center flex-col m-auto gap-4'>
          <LabeledInput
            label='Username'
            type='text'
            placeholder='Enter your username'
            onchange={(e) =>
              setPostInputs((c) => ({
                ...c,
                name: e.target.value,
              }))
            }
          />
          <LabeledInput
            label='Email'
            type='email'
            placeholder='Enter your email'
            onchange={(e) =>
              setPostInputs((c) => ({
                ...c,
                username: e.target.value,
              }))
            }
          />
          <LabeledInput
            label='Password'
            type='password'
            placeholder='Enter your password'
            onchange={(e) =>
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }))
            }
          />
          <button
            type='button'
            className='text-white bg-black w-full hover:opacity-80 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none'
          >
            {type === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

interface LabeledInputType {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}
function LabeledInput({
  label,
  placeholder,
  onchange,
  type,
}: LabeledInputType) {
  return (
    <div className='w-full'>
      <label className='block mb-2 text-sm font-semibold text-gray-900'>
        {label}
      </label>
      <input
        type={type}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeholder}
        onChange={onchange}
        required
      />
    </div>
  );
}
