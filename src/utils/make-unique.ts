import {
  nanoid,
} from 'nanoid';

export default <T extends Record<string, unknown>>(obj: T) => ({
  ...obj,
  id: nanoid(),
});
