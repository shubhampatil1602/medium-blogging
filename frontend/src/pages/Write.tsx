import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../components/Auth';
import { RiLoader4Line } from 'react-icons/ri';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BACKEND_URL } from '../constants';

const Write = () => {
  const [loading, setLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [generate, setGenerate] = useState(false);
  const naviagte = useNavigate();

  const sendBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      return;
    }
    setPublishLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('blogging-token')}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        naviagte(`/blog/${data?.id}`);
      }

      console.log(data);
    } catch (error) {
      console.error('Error sending blog:', error);
    } finally {
      setPublishLoading(false);
    }
  };

  const generateContent = async () => {
    if (!title.trim()) {
      setGenerate(false);
      return;
    }
    setLoading(true);
    try {
      const genAi = new GoogleGenerativeAI(
        'AIzaSyCsEZu-GGVPWc0jXITCacZqAJ-37EFPXj0'
      );
      const model = genAi.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      const res = await model.generateContent(title.trim());
      const markdownContent = await res.response.text();

      setContent(markdownContent);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
      setGenerate(false);
    }
  };

  useEffect(() => {
    if (generate) {
      generateContent().then(() => setGenerate(false));
    }
  }, [generate]);

  useEffect(() => {
    if (!localStorage.getItem('blogging-token')) {
      naviagte('/signup');
    }
  }, []);

  return (
    <section className='w-11/12 sm:w-3/4 md:w-2/4 mx-auto min-h-[85vh]'>
      <div className='flex items-center text-sm text-gray-600 mt-8 mb-4 justify-center'>
        <svg
          className='w-4 h-4 mr-2 text-blue-500'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-11h2v2h-2V7zm0 4h2v6h-2v-6z' />
        </svg>
        The AI-generated content will be rendered correctly with all formatting
        intact.
      </div>
      <form onSubmit={sendBlog}>
        <InputField
          label='Title'
          placeholder='Add title'
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='flex justify-between items-center mb-4'>
          <label className='text-sm font-medium text-gray-900'>Content</label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setGenerate(true);
            }}
            disabled={!title.trim() || loading}
            className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${
              !title.trim() || loading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600'
            }`}
          >
            {loading ? (
              <span className='flex gap-2 justify-center items-center'>
                <RiLoader4Line className='animate-spin text-xl' /> Generating...
              </span>
            ) : (
              'Generate with AI'
            )}
          </button>
        </div>

        <textarea
          rows={20}
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 '
          placeholder='Write your thoughts here...'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>

        <button
          className={`w-full bg-green-700 text-white text-sm rounded-lg p-2.5 mt-3 ${
            publishLoading && 'opacity-80'
          }`}
          disabled={publishLoading}
        >
          {publishLoading ? (
            <span className='flex gap-2 justify-center items-center'>
              <RiLoader4Line className='animate-spin text-xl' /> Loading...
            </span>
          ) : (
            <span>Publish</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default Write;
