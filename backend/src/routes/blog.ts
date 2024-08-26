import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { authMiddleware } from '../authMiddleware';
import { createBlogInput, updateBlogInput } from 'ssp-blogging-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Create a blog post.
blogRouter.post('/', authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: 'Inputs are incorrect.' });
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get('userId'),
        published: true,
        publishedOn: new Date(),
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to create blog.' });
  }
});

// update a blog post.
blogRouter.put('/:id', authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');
  const body = await c.req.json();

  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: 'Inputs are incorrect.' });
  }
  try {
    const blog = await prisma.blog.update({
      where: {
        id: blogId,
        authorId: c.get('userId'),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id, msg: 'Blog updated successfully!' });
  } catch (error) {
    c.status(403);
    return c.json({ msg: 'Unauthorized or blog not found.' });
  }
});

// Get all the blog posts created by you.
blogRouter.get('/my-blogs', authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: c.get('userId'),
      },
    });

    if (blogs.length === 0) {
      return c.json({ msg: 'No blogs found. Start writing your first blog!' });
    }
    return c.json(blogs);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to retrieve blogs.' });
  }
});

// Get all the blog posts with pagination.
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  // Safely retrieve and parse query parameters with default values
  const limitParam = c.req.query('limit');
  const pageParam = c.req.query('page');

  const limit = limitParam ? parseInt(limitParam, 10) : 10; // Default to 10 items per page
  const page = pageParam ? parseInt(pageParam, 10) : 1; // Default to page 1

  // Calculate the number of records to skip
  const skip = (page - 1) * limit;

  try {
    // Fetch the paginated blogs
    const blogs = await prisma.blog.findMany({
      skip: skip, // Skip the calculated number of records
      take: limit, // Limit the number of records returned
    });

    // Optionally, fetch the total count of blogs for additional pagination info
    const totalBlogs = await prisma.blog.count();

    // Return the paginated blogs and additional pagination info
    return c.json({
      blogs,
      pagination: {
        total: totalBlogs,
        page: page,
        limit: limit,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to retrieve blogs.' });
  }
});

// Get a blog post by Id.
blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param('id');
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      c.status(404);
      return c.json({ msg: 'Blog not found.' });
    }
    return c.json(blog);
  } catch (error) {
    c.status(500);
    return c.json({ msg: 'Failed to retrieve blog.' });
  }
});

// Get all the blog posts.
// blogRouter.get('/bulk', async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());
//   try {
//     const blogs = await prisma.blog.findMany();
//     return c.json(blogs);
//   } catch (error) {
//     c.status(500);
//     return c.json({ msg: 'Failed to retrieve blogs.' });
//   }
// });
