//set up hono route
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from '@/app/(auth)/server/route';

const app = new Hono().basePath('/api');
//zbog typesafety-ja moramo ih chainovati
//ne mozemo  odvojeno za svaki metod
//potrebna nam je jedna const

// all routes will be impported here
const routes = app.route('/auth', auth);

export const GET = handle(app);
export const POST = handle(app);

//export type for future use
//export from here because this is the main entry point for the API
//this provides end-to-end type safety
export type AppType = typeof routes;

// Example of adding more routes
app
  .get('/hello', (c) => {
    return c.json({ message: 'Hello, Hono!' });
  })
  .get('/projects/:projectId', (c) => {
    const { projectId } = c.req.param();
    return c.json({ projectId });
  });
