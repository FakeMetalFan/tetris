import { nanoid } from 'nanoid';

export default <T extends Record<string, unknown>>(item: T) => ({
  ...item,
  id: nanoid(),
});
