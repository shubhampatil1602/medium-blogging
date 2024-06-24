import Appbar from '../components/Appbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Publish() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  async function publishPost(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  }
  return (
    <>
      <Appbar />
      <div className='mt-10'>
        <form onSubmit={publishPost}>
          <div className='flex justify-center gap-3'>
            <div className=''>
              <div className='border-r h-20 flex flex-col justify-center items-center'>
                <button
                  type='submit'
                  className='hover:bg-slate-200 rounded-full border-black text-3xl mx-3 font-extralight text-slate-500 px-3 pt-0.5 pb-1 border'
                >
                  +
                </button>
                <span className='block sm:hidden text-sm text-slate-500'>
                  Publish
                </span>
              </div>
            </div>
            <div className='flex flex-col font-serif '>
              <label>
                <input
                  type='text'
                  placeholder='Title'
                  className='text-2xl sm:text-5xl p-1 sm:p-3 outline-none w-full'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <textarea
                  rows={10}
                  cols={70}
                  placeholder='Tell your story...'
                  className='text-lg sm:text-2xl p-1 sm:p-3 outline-none w-full'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
