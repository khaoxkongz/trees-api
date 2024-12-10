import { Hono } from '@hono/hono';

import trees from './trees.ts';

const app = new Hono();

app.get('/', (c) => c.json({ message: 'API - 👋🌎🌍🌏' }));

app.route('/trees', trees);

export default app;
