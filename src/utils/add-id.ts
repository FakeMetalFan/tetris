import { nanoid } from 'nanoid';

const addId = <T extends Record<string, unknown>>(item: T) => ({
  ...item,
  id: nanoid(),
});

export default addId;
