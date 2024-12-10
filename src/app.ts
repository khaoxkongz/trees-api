import { Hono } from '@hono/hono';

import api from './api/index.ts';

const app = new Hono();

app.get('/', (c) => c.json({ message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄' }));

app.route('/api/v1', api);

export default app;
