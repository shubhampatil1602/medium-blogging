import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';

type BlogContext = Context<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>;

export const authMiddleware = async (c: BlogContext, next: Next) => {
  try {
    const header = c.req.header('Authorization');
    if (!header || !header.startsWith('Bearer ')) {
      c.status(401);
      return c.json({ error: 'Invalid token' });
    }

    const token = header.split(' ')[1];
    const user = await verify(token, c.env.JWT_SECRET);

    if (!user) {
      c.status(401);
      return c.json({ error: 'Invalid token' });
    }

    c.set('userId', user.id as string);
    await next();
  } catch (error) {
    c.status(500);
    return c.json({ error: 'Internal server error' });
  }
};
