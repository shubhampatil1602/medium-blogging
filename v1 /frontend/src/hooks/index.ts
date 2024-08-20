import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export interface Blog {
  content: string;
  author: {
    name: string;
  };
  title: string;
  id: string;
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          // Redirect to login page if unauthorized
          navigate('/signin');
        } else {
          console.error('Failed to fetch blog:', error);
          setLoading(false);
        }
      });
  }, [id, navigate]);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          // Redirect to login page if unauthorized
          navigate('/signin');
        } else {
          console.error('Failed to fetch blogs:', error);
          setLoading(false);
        }
      });
  }, [navigate]);

  return {
    loading,
    blogs,
  };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return logout;
};

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BACKEND_URL } from '../config';

// export interface Blog {
//   content: string;
//   author: {
//     name: string;
//   };
//   title: string;
//   id: string;
// }

// export const useBlog = ({ id }: { id: string }) => {
//   const [loading, setLoading] = useState(true);
//   const [blog, setBlog] = useState<Blog>();

//   useEffect(() => {
//     axios
//       .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       })
//       .then((response) => {
//         setBlog(response.data);
//         setLoading(false);
//       });
//   }, [id]);

//   return {
//     loading,
//     blog,
//   };
// };

// export const useBlogs = () => {
//   const [loading, setLoading] = useState(true);
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     axios
//       .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
//         headers: {
//           Authorization: localStorage.getItem('token'),
//         },
//       })
//       .then((response) => {
//         setBlogs(response.data.posts);
//         setLoading(false);
//       });
//   }, []);

//   return {
//     loading,
//     blogs,
//   };
// };
