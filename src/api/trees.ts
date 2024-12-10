import { Hono } from '@hono/hono';

const app = new Hono();

type Tree = {
  id: string;
  species: string;
  age: number;
  location: string;
};

const setItem = (key: string, value: Tree) => {
  const treeString = JSON.stringify(value);
  localStorage.setItem(key, treeString);
  return;
};

const getItem = (key: string): Tree | null => {
  const tree = localStorage.getItem(key);
  return tree ? JSON.parse(tree) : null;
};

const deleteItem = (key: string) => {
  localStorage.removeItem(key);
  return;
};

app.post('/', async (c) => {
  const treeDetails = await c.req.json();
  const tree: Tree = treeDetails;
  setItem(`tree_${tree.id}`, tree);

  return c.json({
    message: `We just add a ${tree.species}!`,
  });
});

app.get('/:id', (c) => {
  const id = c.req.param('id');
  const tree = getItem(`tree_${id}`);

  if (!tree) return c.json({ message: 'Tree not found' }, 404);

  return c.json(tree);
});

app.put('/:id', async (c) => {
  const id = c.req.param('id');
  const { species, age, location } = await c.req.json();
  const updatedTree: Tree = { id, species, age, location };
  setItem(`tree_${id}`, updatedTree);

  return c.json({
    message: `Tree has changed, ${species}, ${age} and ${location}`,
  });
});

app.delete('/:id', (c) => {
  const id = c.req.param('id');
  deleteItem(`tree_${id}`);

  return c.json({
    message: `Tree ${id} has been cut down.`,
  });
});

export default app;
